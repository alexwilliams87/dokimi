'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var AnswerSchema = new Schema({
  offsetQuestion: {
    type: Number
  },
  form: {
    type: Schema.ObjectId,
    ref: 'Form'
  },
  results: {
    type: Object
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Answer', AnswerSchema);
