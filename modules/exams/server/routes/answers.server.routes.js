'use strict';

/**
 * Module dependencies
 */
var answers = require('../controllers/answers.server.controller');

module.exports = function (app) {

  app.route('/api/answers')
    .post(answers.create);

};
