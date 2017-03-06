'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Result Schema
 */
var ResultSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  guid: {
    type: String
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
  result: {
    type: Number,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Result', ResultSchema);
