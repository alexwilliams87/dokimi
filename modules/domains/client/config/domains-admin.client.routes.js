(function () {
  'use strict';

  angular
    .module('domains.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.domains', {
        abstract: true,
        url: '/domains',
        template: '<ui-view/>'
      })
      .state('admin.domains.list', {
        url: '',
        templateUrl: '/modules/domains/client/views/admin/list-domains.client.view.html',
        controller: 'DomainsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.domains.create', {
        url: '/create',
        templateUrl: '/modules/domains/client/views/admin/form-domain.client.view.html',
        controller: 'DomainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          domainResolve: newDomain
        }
      })
      .state('admin.domains.edit', {
        url: '/:domainId/edit',
        templateUrl: '/modules/domains/client/views/admin/form-domain.client.view.html',
        controller: 'DomainsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          domainResolve: getDomain
        }
      });
  }

  getDomain.$inject = ['$stateParams', 'DomainsService'];

  function getDomain($stateParams, DomainsService) {
    return DomainsService.get({
      domainId: $stateParams.domainId
    }).$promise;
  }

  newDomain.$inject = ['DomainsService'];

  function newDomain(DomainsService) {
    return new DomainsService();
  }
}());
