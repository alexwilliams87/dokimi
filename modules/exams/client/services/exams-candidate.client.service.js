(function () {
  'use strict';

  angular
    .module('exams.services')
    .factory('ExamsCandidateService', ExamsCandidateService);

  ExamsCandidateService.$inject = ['$resource'];

  function ExamsCandidateService($resource) {
    var Exam = $resource('/api/exams/candidate/:examCandidateId', {
      examCandidateId: '@_id'
    });

    return Exam;
  }
}());
