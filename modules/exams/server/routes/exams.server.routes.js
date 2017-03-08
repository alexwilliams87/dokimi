'use strict';

/**
 * Module dependencies
 */
var examsPolicy = require('../policies/exams.server.policy'),
    exams = require('../controllers/exams.server.controller');

module.exports = function (app) {

  // Exams routes for candidate
  app.use('/api/exams/candidate/:examId', exams.sanitize);

  app.route('/api/exams/candidate/:examId')
    .get(exams.run)
    .post(exams.progress);

  // Exams collection routes
  app.route('/api/exams').all(examsPolicy.isAllowed)
    .get(exams.list);

  // Single exam routes
  app.route('/api/exams/:examId').all(examsPolicy.isAllowed)
    .get(exams.read)
    .put(exams.update)
    .delete(exams.delete);

  // Finish by binding the exam middleware
  app.param('examId', exams.examByID);
};
