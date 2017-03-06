(function () {
  'use strict';

  angular
    .module('results.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('results', {
        abstract: true,
        url: '/results',
        template: '<ui-view/>'
      })
      .state('results.list', {
        url: '',
        templateUrl: '/modules/results/client/views/staff/list-results.client.view.html',
        controller: 'ResultsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Results List'
        }
      })
      .state('results.view', {
        url: '/:resultId',
        templateUrl: '/modules/results/client/views/view-result.client.view.html',
        controller: 'ResultsController',
        controllerAs: 'vm',
        resolve: {
          resultResolve: getResult
        },
        data: {
          pageTitle: 'Result {{ resultResolve.title }}'
        }
      });
  }

  getResult.$inject = ['$stateParams', 'ResultsService'];

  function getResult($stateParams, ResultsService) {
    return ResultsService.get({
      resultId: $stateParams.resultId
    }).$promise;
  }
}());
