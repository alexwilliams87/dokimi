'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  FormValidator = require('./validators/form.server.model.validator');

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
  questions: {
    type: Array,
    validate: [FormValidator.questions, 'Uh oh, {PATH} does not equal "something".']
  },
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
