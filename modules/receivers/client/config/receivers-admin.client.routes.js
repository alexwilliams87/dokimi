(function () {
  'use strict';

  angular
    .module('receivers.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.receivers', {
        abstract: true,
        url: '/receivers',
        template: '<ui-view/>'
      })
      .state('admin.receivers.list', {
        url: '',
        templateUrl: '/modules/receivers/client/views/admin/list-receivers.client.view.html',
        controller: 'ReceiversAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.receivers.create', {
        url: '/create',
        templateUrl: '/modules/receivers/client/views/admin/form-receiver.client.view.html',
        controller: 'ReceiversAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          receiverResolve: newReceiver
        }
      })
      .state('admin.receivers.edit', {
        url: '/:receiverId/edit',
        templateUrl: '/modules/receivers/client/views/admin/form-receiver.client.view.html',
        controller: 'ReceiversAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          receiverResolve: getReceiver
        }
      });
  }

  getReceiver.$inject = ['$stateParams', 'ReceiversService'];

  function getReceiver($stateParams, ReceiversService) {
    return ReceiversService.get({
      receiverId: $stateParams.receiverId
    }).$promise;
  }

  newReceiver.$inject = ['ReceiversService'];

  function newReceiver(ReceiversService) {
    return new ReceiversService();
  }
}());
