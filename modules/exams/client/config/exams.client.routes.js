(function () {
  'use strict';

  angular
    .module('exams.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('exams', {
        abstract: true,
        url: '/exams',
        template: '<ui-view/>'
      })
      .state('exams.candidate', {
        url: '/candidate/:examCandidateId',
        templateUrl: '/modules/exams/client/views/view-exam.client.view.html',
        controller: 'ExamsController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExamCandidate
        },
        data: {
          pageTitle: 'Exam {{ examResolve.title }}'
        }
      });
  }

  getExamCandidate.$inject = ['$stateParams', 'ExamsCandidateService'];

  function getExamCandidate($stateParams, ExamsCandidateService) {
    return ExamsCandidateService.get({
      examCandidateId: $stateParams.examCandidateId
    }).$promise;
  }
}());
