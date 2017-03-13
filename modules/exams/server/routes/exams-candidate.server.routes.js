'use strict';

/**
 * Module dependencies
 */
var examsPolicy = require('../policies/exams.server.policy'),
    examsCandidate = require('../controllers/exams-candidate.server.controller');

module.exports = function (app) {

  // Exams collection routes for candidate
  app.route('/api/exams/candidate').all(examsPolicy.isAllowed)
    .get(examsCandidate.list);

  // Single Exam routes for candidate
  app.route('/api/exams/candidate/:examCandidateId').all(examsPolicy.isAllowed)
    .get(examsCandidate.read)
    .post(examsCandidate.validate);

  app.param('examCandidateId', examsCandidate.examCandidateByID);
};
