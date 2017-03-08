'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  Form = mongoose.model('Form'),
  Exam = mongoose.model('Exam'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Submit the current form FAIRE L'ENVOI DES MAILS
 */
exports.submit = function (req, res) { // revoir syntaxe
  var form = req.form;

  if (!form.submitted && (form.user._id.toString() === req.user._id.toString())) {
    form.submitted = true;

    form.receivers.forEach(function(receiver) {
      var exam = new Exam();

      exam.form = form;
      exam.user = receiver;

      exam.save();
    });

    form.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(form);
      }
    });
  }
};

/**
 * Create an form
 */
exports.create = function (req, res) {
  var form = new Form(req.body);
  form.user = req.user;

  form.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(form);
    }
  });
};

/**
 * Show the current form
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var form = req.form ? req.form.toJSON() : {};

  // Add a custom field to the Form, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Form model.
  form.isCurrentUserOwner = !!(req.user && form.user && form.user._id.toString() === req.user._id.toString());

  res.json(form);
};

/**
 * Update an form
 */
exports.update = function (req, res) {
  var form = req.form;

  if (form.submitted) {
    return res.status(422).send({
      message: 'This form is locked because submitted !'
    });
  }

  form.title = req.body.title;
  form.description = req.body.description;
  form.questions = req.body.questions;
  form.receivers = req.body.receivers;
  form.submitted = req.body.submitted;

  form.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(form);
    }
  });
};

/**
 * Delete an form
 */
exports.delete = function (req, res) {
  var form = req.form;

  if (form.submitted) {
    return res.status(422).send({
      message: 'Form is locked when submitted !'
    });
  }

  if (form.user._id.toString() !== req.user._id.toString()) {
    return res.status(422).send({
      message: 'This form is not yours !'
    });
  }

  form.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(form);
    }
  });
};

/**
 * List of Forms
 */
exports.list = function (req, res) {
  Form.find().sort('-created').populate('user', 'displayName').exec(function (err, forms) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(forms);
    }
  });
};

/**
 * Form middleware
 */
exports.formByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Form is invalid'
    });
  }

  Form.findById(id).populate('user', 'displayName').populate('receivers', 'displayName').exec(function (err, form) {
    if (err) {
      return next(err);
    } else if (!form) {
      return res.status(404).send({
        message: 'No form with that identifier has been found'
      });
    }
    req.form = form;
    next();
  });
};
