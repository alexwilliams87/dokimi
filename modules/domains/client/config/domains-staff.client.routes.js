(function () {
  'use strict';

  angular
    .module('domains.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.domains', {
        abstract: true,
        url: '/domains',
        template: '<ui-view/>'
      })
      .state('staff.domains.list', {
        url: '',
        templateUrl: '/modules/domains/client/views/staff/list-domains.client.view.html',
        controller: 'DomainsStaffListController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Liste des domaines'
        }
      })
      .state('staff.domains.create', {
        url: '/create',
        templateUrl: '/modules/domains/client/views/staff/form-domain.client.view.html',
        controller: 'DomainsStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Créer un domaine'
        },
        resolve: {
          domainResolve: newDomain
        }
      })
      .state('staff.domains.edit', {
        url: '/:domainId/edit',
        templateUrl: '/modules/domains/client/views/staff/form-domain.client.view.html',
        controller: 'DomainsStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Editer un domaine'
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
