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
 * Clean the current exam for candidate
 */
exports.sanitize = function(req, res, next) {
  req.exam.form.questions.forEach(function(question) {
    delete question.body.results;
  });

  next();
};

/**
 * Show the current exam for candidate
 */
exports.run = function(req, res) {
  var exam = req.exam ? req.exam.toJSON() : {};

  if (exam.form.submitted && _.find(exam.form.receivers, req.user._id)) {
    res.json(exam);
  }
};

/**
 * Progress the current exam for candidate
 */
exports.progress = function (req, res) {
  var exam = req.exam;

  exam.answers.push(req.body.answers[req.body.answers.length - 1]);

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
    res.json(exam);
  }
};

/**
 * Update an exam
 */
exports.update = function (req, res) {
  var exam = req.exam;

  // exam.ansers.push(req.body.answer[req.body.answer.length - 1]);
  // push answer
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
