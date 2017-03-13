'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  Exam = mongoose.model('Exam'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Create an exam
 */
exports.create = function (req, res) {
  var exam = new Exam(req.body);
  exam.user = req.user;

  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(exam);
    }
  });
};

/**
 * Show the current exam
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var exam = req.exam ? req.exam.toJSON() : {};

  res.json(exam);
};

/**
 * Update an exam
 */
exports.update = function (req, res) {
  var exam = req.exam;

  // exam.ansers.push(req.body.answer[req.body.answer.length - 1]);
  // push answer
  exam.answers = req.body.answers;
  exam.points = req.body.points;
  exam.state = req.body.state;

  exam.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(exam);
    }
  });
};

/**
 * Delete an exam
 */
exports.delete = function (req, res) {
  var exam = req.exam;

  exam.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(exam);
    }
  });
};

/**
 * List of Exams
 */
exports.list = function (req, res) {
  Exam.find().sort('-created').populate('user', 'displayName').exec(function (err, exams) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(exams);
    }
  });
};

/**
 * List of exams by connected owner
 */
exports.listByConnectedOwner = function (req, res) {
  Exam.find().populate('user', 'displayName').populate('form')
    .where('owner').equals(req.user.id)
    .exec(function (err, exams) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(exams);
    }
  });
};

/**
 * Exam middleware
 */
exports.examByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Exam is invalid'
    });
  }

  Exam.findById(id)
    .populate('user',  'displayName')
    .populate('owner', 'displayName')
    .populate('form')
    .populate('answers')
    .exec(function (err, exam) {
    if (err) {
      return next(err);
    } else if (!exam) {
      return res.status(404).send({
        message: 'No exam with that identifier has been found'
      });
    }

    req.exam = exam;
    next();
  });
};
