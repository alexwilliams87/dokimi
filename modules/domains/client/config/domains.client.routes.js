(function () {
  'use strict';

  angular
    .module('domains.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('domains', {
        abstract: true,
        url: '/domains',
        template: '<ui-view/>'
      })
      .state('domains.list', {
        url: '',
        templateUrl: '/modules/domains/client/views/list-domains.client.view.html',
        controller: 'DomainsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Domains List'
        }
      })
      .state('domains.view', {
        url: '/:domainId',
        templateUrl: '/modules/domains/client/views/view-domain.client.view.html',
        controller: 'DomainsController',
        controllerAs: 'vm',
        resolve: {
          domainResolve: getDomain
        },
        data: {
          pageTitle: 'Domain {{ domainResolve.title }}'
        }
      });
  }

  getDomain.$inject = ['$stateParams', 'DomainsService'];

  function getDomain($stateParams, DomainsService) {
    return DomainsService.get({
      domainId: $stateParams.domainId
    }).$promise;
  }
}());
