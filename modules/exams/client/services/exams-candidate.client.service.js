(function () {
  'use strict';

  angular
    .module('exams.services')
    .factory('ExamsCandidateService', ExamsCandidateService);

  ExamsCandidateService.$inject = ['$resource', '$log'];

  function ExamsCandidateService($resource, $log) {
    var Exam = $resource('/api/exams/candidate/:examId', {
      examId: '@_id'
    });

    return Exam;
  }
}());
