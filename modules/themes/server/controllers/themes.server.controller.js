'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  Theme = mongoose.model('Theme'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/**
 * Create a theme
 */
exports.create = function (req, res) {
  console.log(req.body);
  var theme = new Theme(req.body);
  theme.user = req.user;

  theme.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theme);
    }
  });
};

/**
 * Show the current theme
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var theme = req.theme ? req.theme.toJSON() : {};

  // Add a custom field to the Theme, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Theme model.
  theme.isCurrentUserOwner = !!(req.user && theme.user && theme.user._id.toString() === req.user._id.toString());

  res.json(theme);
};

/**
 * Update an theme
 */
exports.update = function (req, res) {
  var theme = req.theme;

  theme.name = req.body.name;
  console.log(req.body);
  theme.domain = req.body.domain;

  theme.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theme);
    }
  });
};

/**
 * Delete an theme
 */
exports.delete = function (req, res) {
  var theme = req.theme;

  theme.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(theme);
    }
  });
};

/**
 * List of Themes
 */
exports.list = function (req, res) {
  Theme.find().sort('-created').populate('user', 'displayName').populate('domain', 'name').exec(function (err, themes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(themes);
    }
  });
};

/**
 * Theme middleware
 */
exports.themeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Theme is invalid'
    });
  }

  Theme.findById(id).populate('user', 'displayName').populate('domain').exec(function (err, theme) {
    if (err) {
      return next(err);
    } else if (!theme) {
      return res.status(404).send({
        message: 'No theme with that identifier has been found'
      });
    }
    req.theme = theme;
    next();
  });
};
