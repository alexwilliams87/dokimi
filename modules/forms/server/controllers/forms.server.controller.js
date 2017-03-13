'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  nodemailer = require('nodemailer'),
  Form = mongoose.model('Form'),
  Exam = mongoose.model('Exam'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var sendMailExamLink = function(receivers) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rootofgeno@gmail.com',
        pass: ''
      }
  });

  // setup email data with unicode symbols
  var mailOptions = {
      from: '"Fred Foo" <rootofgeno@gmail.com>', // sender address
      to: 'nemesis87aw@hotmail.fr', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world ?', // plain text body
      html: '<b>Hello world ?</b>' // html body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error trigger');
      return console.log(error);
    }

    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

/**
 * Submit the current form
 */
exports.submit = function (req, res) {
  var form = req.form;

  if (form.submitted) {
    return res.status(422).send({
      message: 'Form already submitted'
    });
  }

  form.submitted = true;

  form.receivers.forEach(function(receiver) {
    var exam = new Exam();

    exam.form = form;
    exam.user = receiver;
    exam.owner = req.user.id;

    exam.save();
  });

  form.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // sendMailExamLink(emailReceivers);
      res.json(form);
    }
  });
};

/**
 * Unsubmit the current form
 */
exports.unsubmit = function (req, res) {
  var form = req.form;

  if (!form.submitted) {
    return res.status(422).send({
      message: 'Form not submitted'
    });
  }

  Exam.find({ form: form }).where('state').ne('checked').exec(function (err, exams) {
    if (!_.isEmpty(exams)) {
      return res.status(422).send({
        message: 'Veuillez corriger tous les examens liés à ce questionnaire !'
      });
    }
    else {
      form.submitted = false;
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
  });

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
