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
var QuestionBodySchema =  new Schema({
  type: {
    type: String,
    enum : ['radio', 'checkbox', 'boolean', 'missing', 'regmissing', 'opened', 'ranking']
  },
  response: {
    type: Object
  }
});

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
    default: '',
    trim: true,
    required: 'Subject cannot be blank'
  },
  theme: {
    type: Schema.ObjectId,
    ref: 'Theme'
  },
  points: {
    type: Number,
    max: 5
  },
  additional : {
    type: Object
  },
  body: {
    type: QuestionBodySchema,
    validate: [QuestionValidator.body, 'Uh oh, {PATH} does not equal "something".']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Question', QuestionSchema);
