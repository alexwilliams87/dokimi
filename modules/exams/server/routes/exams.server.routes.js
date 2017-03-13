'use strict';

/**
 * Module dependencies
 */
var examsPolicy = require('../policies/exams.server.policy'),
    exams = require('../controllers/exams.server.controller');

module.exports = function (app) {

  // Exams collection routes
  app.route('/api/exams').all(examsPolicy.isAllowed)
    .get(exams.list);

  app.route('/api/exams/ownByMe').all(examsPolicy.isAllowed)
    .get(exams.listByConnectedOwner);

  // Single exam routes
  app.route('/api/exams/:examId').all(examsPolicy.isJustOwner)
    .get(exams.read)
    .put(exams.update)
    .delete(exams.delete);

  // Finish by binding the exam middleware
  app.param('examId', exams.examByID);
};
