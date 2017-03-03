'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Receiver = mongoose.model('Receiver'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a receiver
 */
exports.create = function (req, res) {
  var receiver = new Receiver(req.body);
  receiver.user = req.user;

  receiver.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(receiver);
    }
  });
};

/**
 * Show the current receiver
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var receiver = req.receiver ? req.receiver.toJSON() : {};

  // Add a custom field to the Receiver, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Receiver model.
  receiver.isCurrentUserOwner = !!(req.user && receiver.user && receiver.user._id.toString() === req.user._id.toString());

  res.json(receiver);
};

/**
 * Update an receiver
 */
exports.update = function (req, res) {
  var receiver = req.receiver;

  receiver.name = req.body.name;
  receiver.users = req.body.users;

  receiver.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(receiver);
    }
  });
};

/**
 * Delete an receiver
 */
exports.delete = function (req, res) {
  var receiver = req.receiver;

  receiver.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
     } else {
      res.json(receiver);
    }

  });
};

/**
 * List of Receivers
 */
exports.list = function (req, res) {
  Receiver.find().sort('-created').populate('user').populate('users', 'displayName').exec(function (err, receivers) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(receivers);
    }
  });
};

/**
 * Receiver middleware
 */
exports.receiverByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Receiver is invalid'
    });
  }

  Receiver.findById(id).populate('user').populate('users').exec(function(err, receiver){
    if (err) {
      return next(err);
    } else if (!receiver) {
      return res.status(404).send({
        message: 'No receiver with that identifier has been found'
      });
    }
    req.receiver = receiver;
    next();
  });
};
