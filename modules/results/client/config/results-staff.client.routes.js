(function () {
  'use strict';

  angular
    .module('results.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.results', {
        abstract: true,
        url: '/results',
        template: '<ui-view/>'
      })
      .state('staff.results.list', {
        url: '',
        templateUrl: '/modules/results/client/views/staff/list-results.client.view.html',
        controller: 'ResultsStaffListController',
        controllerAs: 'vm',
        data: {
          roles: ['staff']
        }
      })
      .state('staff.results.create', {
        url: '/create',
        templateUrl: '/modules/results/client/views/staff/create-result.client.view.html',
        controller: 'ResultStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff']
        },
        resolve: {
          resultResolve: newResult
        }
      })
      .state('staff.results.edit', {
        url: '/:resultId/edit',
        templateUrl: '/modules/results/client/views/staff/create-result.client.view.html',
        controller: 'ResultStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff']
        },
        resolve: {
          resultResolve: getResult
        }
      });
  }

  getResult.$inject = ['$stateParams', 'ResultsService'];

  function getResult($stateParams, ResultsService) {
    return ResultsService.get({
      resultId: $stateParams.resultId
    }).$promise;
  }

  newResult.$inject = ['ResultsService'];

  function newResult(ResultsService) {
    return new ResultsService();
  }
}());
