'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Form Schema
 */
var FormSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Description cannot be blank'
  },
  questions: [
    {
      type: Object
    }
  ],
  receivers: [
    {
      type: Schema.ObjectId,
      ref: 'Users'
    }
  ],
  submitted: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Form', FormSchema);
