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
      .state('exams.list', {
        url: '',
        templateUrl: '/modules/exams/client/views/staff/list-exams.client.view.html',
        controller: 'ExamsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Exams List'
        }
      })
      .state('exams.view', {
        url: '/:examId',
        templateUrl: '/modules/exams/client/views/view-exam.client.view.html',
        controller: 'ExamsController',
        controllerAs: 'vm',
        resolve: {
          examResolve: getExam
        },
        data: {
          pageTitle: 'Exam {{ examResolve.title }}'
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
