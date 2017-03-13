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


/**
 * List of exams for current candidate
 */
exports.list = function(req, res) {
  Exam.find({user: req.user.id}).sort('-created').populate('user', 'displayName').exec(function (err, exams) {
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
 * Show the current exam for candidate
 */
exports.read = function(req, res) {
  var exam = req.exam ? req.exam.toJSON() : {};

  if (exam.form.submitted && _.find(exam.form.receivers, req.user._id)) {
    res.json(exam);
  }
};

/**
 * Validate an answer for the current exam for candidate
 */
exports.validate = function (req, res) {
  var exam = req.exam;
  var answer = new Answer(req.body.answers[req.body.answers.length - 1]);
  answer.user = req.user;

  exam.answers.push(answer);

  answer.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      exam.save(function (err) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(exam);
        }
      });
    }
  });
};

/**
 * Clean the current exam form (delete answers) for candidate
 */
exports.examCandidateByID = function (req, res, next, id) {

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

    exam.form.questions.forEach(function(question) {
      question.body.results = undefined;
      delete question.body.results;
    });

    req.exam = exam;
    next();
  });
};
