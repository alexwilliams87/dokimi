'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    QuestionValidator = require('./validators/question.server.model.validator');

/**
 * Question Body Schema
 */
var QuestionBodySchema = new Schema({
  type: {
    type: String,
    enum : ['radio', 'checkbox', 'boolean', 'missing', 'regmissing', 'opened', 'ranking'],
    required: 'Type cannot be blank'
  },
  data: {
    type: Object
  },
  results: {
    type: Object
  }
});

exports.QuestionBodySchema = QuestionBodySchema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  subject: {
    type: String,
    trim: true,
    required: 'Subject cannot be blank'
  },
  theme: {
    type: Schema.ObjectId,
    ref: 'Theme',
    required: 'Theme cannot be blank'
  },
  points: {
    type: Number,
    max: 5,
    default: 1
  },
  additional : {
    type: Object
  },
  body: {
    type: QuestionBodySchema,
    validate: [QuestionValidator.body, 'Uh oh, {PATH} does not equal "something".'],
    required: 'Body cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});


mongoose.model('Question', QuestionSchema);
