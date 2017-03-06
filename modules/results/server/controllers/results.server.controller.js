'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Result = mongoose.model('Result'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an result
 */
exports.create = function (req, res) {
  var result = new Result(req.body);
  result.user = req.user;

  result.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(result);
    }
  });
};

/**
 * Show the current result
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var result = req.result ? req.result.toJSON() : {};

  // Add a custom field to the Result, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Result model.
  result.isCurrentUserOwner = !!(req.user && result.user && result.user._id.toString() === req.user._id.toString());

  res.json(result);
};

/**
 * Update an result
 */
exports.update = function (req, res) {
  var result = req.result;

  result.title = req.body.title;
  result.description = req.body.description;
  result.questions = req.body.questions;
  result.receivers = req.body.receivers;
  result.submitted = req.body.submitted;

  result.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(result);
    }
  });
};

/**
 * Delete an result
 */
exports.delete = function (req, res) {
  var result = req.result;

  result.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(result);
    }
  });
};

/**
 * List of Results
 */
exports.list = function (req, res) {
  Result.find().sort('-created').populate('user', 'displayName').exec(function (err, results) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(results);
    }
  });
};

/**
 * Result middleware
 */
exports.resultByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Result is invalid'
    });
  }

  Result.findById(id).populate('user', 'displayName').exec(function (err, result) {
    if (err) {
      return next(err);
    } else if (!result) {
      return res.status(404).send({
        message: 'No result with that identifier has been found'
      });
    }
    req.result = result;
    next();
  });
};
