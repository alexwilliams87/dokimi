'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  path = require('path'),
  mongoose = require('mongoose'),
  Exam = mongoose.model('Exam'),
  Answer = mongoose.model('Answer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


// ANSWER CONTROLLER METHOD ==>

exports.createAnswer = function(req, res) {
  var answer = new Answer(req.body);
  answer.user = req.user;

  answer.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(answer);
    }
  });
};




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

  if (exam.form.submitted && _.find(exam.form.receivers, req.user._id)) {
    exam.form.questions.forEach(function(question) {
      delete question.body.results;
    });

    res.json(exam);
  }
};

/**
 * Update an exam
 */
exports.update = function (req, res) {
  var exam = req.exam;

  exam.answers = req.body.answers;

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
 * Exam middleware
 */
exports.examByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Exam is invalid'
    });
  }

  Exam.findById(id).populate('user', 'displayName').populate('form').exec(function (err, exam) {
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
