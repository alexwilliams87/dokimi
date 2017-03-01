'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
var _ = require('lodash'),
  Schema = mongoose.Schema;

  var custom = [validator, 'Uh oh, {PATH} does not equal "something".'];

  function validator(data) {
    switch(data.type) {

      case 'checkbox':
      case 'radio':
        var checked = false;
        if (!Array.isArray(data.response) && data.response.length < 0) return false;

        for (let i = 0; i < data.response.length; i++) {
          if (!data.response[i].value) return false;
          if (data.response[i].checked === true) checked = true;
          if (data.response[i].value.length <= 0) return false;
        }

        return (checked) ? true : false;
        break;

      case 'boolean':
        if (!Array.isArray(data.response) && data.response.length !== 2) return false;

        for (var i = 0; i < data.response.length; i++) {
          if (!data.response[i].assign) return false;
          if (!data.response[i].value) return false;

          if (data.response[i].assign !== 'true' && data.response[i].assign !== 'false') return false;
          if (data.response[i].value.length <= 0) return false;
        }

        return (data.response[0].checked || data.response[1].checked) ? true : false;
        break;

      case 'missing':
        if (!data.response.content) return false;
        if (!Array.isArray(data.response.values)) return false;

        for (var i = 0; i < data.response.values.length; i++) {
          if (data.response.values[i].length <= 0) return false;
        }

        var res = data.response.content.match(/%s/g);

        if (res) {
          return (res.length === data.response.values.length) ? true : false;
        }

        return true;
        break;

      case 'ranking':

        break;
    }

  }

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
    validate: custom
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Question', QuestionSchema);
