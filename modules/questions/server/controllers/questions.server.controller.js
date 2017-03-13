'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Question = mongoose.model('Question'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

  /**
   * Upload image for question
   */
exports.uploadImage = function(req, res) {
  var multerConfig = config.uploads.questions.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newImage');

  uploadImage().then(function(path) {
    res.json(path);
  }).catch(function(err) {
    res.status(422).send(err);
  });

  function uploadImage() {
    return new Promise(function(resolve, reject) {
      upload(req, res, function(uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          var path = config.uploads.questions.image.dest + req.file.filename;
          path = path.slice(1);
          resolve(path);
        }
      });
    });
  }
};

/**
 * Create an question
 */
exports.create = function (req, res) {
  var question = new Question(req.body);
  question.user = req.user;

  question.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};

/**
 * Show the current question
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var question = req.question ? req.question.toJSON() : {};

  // Add a custom field to the Question, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Question model.
  question.isCurrentUserOwner = !!(req.user && question.user && question.user._id.toString() === req.user._id.toString());

  res.json(question);
};

/**
 * Update an question
 */
exports.update = function (req, res) {
  var question = req.question;

  question.subject = req.body.subject;
  question.points = req.body.points;
  question.body = req.body.body;
  question.theme = req.body.theme;

  question.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};

/**
 * Delete an question
 */
exports.delete = function (req, res) {
  var question = req.question;

  question.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(question);
    }
  });
};

/**
 * List of Questions
 */
 exports.list = function (req, res) {
   Question.find().sort('-created').populate('user', 'displayName')
   .populate({
     path: 'theme',
     populate: {
       path: 'domain'
     }
   })
   .exec(function (err, questions) {
     if (err) {
       return res.status(422).send({
         message: errorHandler.getErrorMessage(err)
       });
     } else {
       res.json(questions);
     }
   });
 };

/**
 * Question middleware
 */
exports.questionByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Question is invalid'
    });
  }

  // Voir si populate theme est nécéssaire ??
  Question.findById(id).populate('theme').populate('user', 'displayName')
  .populate({
    path: 'theme',
    populate: {
      path: 'domain'
    }
  })
  .exec(function (err, question) {
    if (err) {
      return next(err);
    } else if (!question) {
      return res.status(404).send({
        message: 'No question with that identifier has been found'
      });
    }
    req.question = question;
    next();
  });
};
