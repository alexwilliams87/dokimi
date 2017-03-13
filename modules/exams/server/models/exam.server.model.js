'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var ExamSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  form: {
    type: Schema.ObjectId,
    ref: 'Form'
  },
  answers: [
    {
      type: Schema.ObjectId,
      ref: 'Answer'
    }
  ],
  points: {
    type: Number,
    default: 0
  },
  state: {
    type: String,
    enum:['unchecked', 'progress', 'checked'],
    default: 'unchecked'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Exam', ExamSchema);
