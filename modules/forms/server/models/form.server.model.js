'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  QuestionModel = require(path.resolve('./modules/questions/server/models/question.server.model')),
  QuestionValidator = require(path.resolve('./modules/questions/server/models/validators/question.server.model.validator'));


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
      subject: {
        type: String,
        trim: true,
        required: 'Subject cannot be blank'
      },
      theme: {
        type: Object,
        required: 'Theme cannot be blank'
      },
      points: {
        type: Number,
        max: 5,
        default: 1
      },
      body: {
        type: QuestionModel.QuestionBodySchema,
        validate: [QuestionValidator.body, 'Uh oh, {PATH} does not equal "something".']
      }
    }
  ],
  receivers: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ],
  submitted: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Form', FormSchema);
