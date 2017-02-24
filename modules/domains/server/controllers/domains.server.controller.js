'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Domain = mongoose.model('Domain'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a domain
 */
exports.create = function (req, res) {
  var domain = new Domain(req.body);
  domain.user = req.user;

  domain.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(domain);
    }
  });
};

/**
 * Show the current domain
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var domain = req.domain ? req.domain.toJSON() : {};

  // Add a custom field to the Domain, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Domain model.
  domain.isCurrentUserOwner = !!(req.user && domain.user && domain.user._id.toString() === req.user._id.toString());

  res.json(domain);
};

/**
 * Update an domain
 */
exports.update = function (req, res) {
  var domain = req.domain;

  domain.name = req.body.name;

  domain.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(domain);
    }
  });
};

/**
 * Delete an domain
 */
exports.delete = function (req, res) {
  var domain = req.domain;

  domain.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
     } else {
        res.json(domain);
    }
  });
};

/**
 * List of Domains
 */
exports.list = function (req, res) {
  Domain.find().sort('-created').populate('user', 'displayName').exec(function (err, domains) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(domains);
    }
  });
};

/**
 * Domain middleware
 */
exports.domainByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Domain is invalid'
    });
  }

  Domain.findById(id).populate('user', 'displayName').exec(function (err, domain) {
    if (err) {
      return next(err);
    } else if (!domain) {
      return res.status(404).send({
        message: 'No domain with that identifier has been found'
      });
    }
    req.domain = domain;
    next();
  });
};
