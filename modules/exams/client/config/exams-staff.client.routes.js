(function () {
  'use strict';

  angular
    .module('exams.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.exams', {
        abstract: true,
        url: '/exams',
        template: '<ui-view/>'
      })
      .state('staff.exams.list', {
        url: '',
        templateUrl: '/modules/exams/client/views/staff/list-exams.client.view.html',
        controller: 'ExamsStaffListController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Liste des examens'
        }
      })
      .state('staff.exams.correct', {
        url: '/correct/:examId',
        templateUrl: '/modules/exams/client/views/staff/exam-correction.client.view.html',
        controller: 'ExamsStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Correction d\'un examen'
        },
        resolve: {
          examResolve: getExam
        }
      });
  }

  getExam.$inject = ['$stateParams', 'ExamsService'];

  function getExam($stateParams, ExamsService) {
    return ExamsService.get({
      examId: $stateParams.examId
    }).$promise;
  }

}());
