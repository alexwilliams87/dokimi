'use strict';

/**
 * Module dependencies
 */
var examsPolicy = require('../policies/exams.server.policy'),
  exams = require('../controllers/exams.server.controller');

module.exports = function (app) {
  // Exams collection routes
  app.route('/api/exams').all(examsPolicy.isAllowed)
    .get(exams.list)
    .post(exams.create);

  // Single exam routes
  app.route('/api/exams/:examId').all(examsPolicy.isAllowed)
    .get(exams.read)
    .put(exams.update)
    .delete(exams.delete);

  app.route('/api/answers')
    .post(exams.createAnswer);

  // Finish by binding the exam middleware
  app.param('examId', exams.examByID);
};
