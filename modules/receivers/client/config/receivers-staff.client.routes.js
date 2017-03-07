(function () {
  'use strict';

  angular
    .module('receivers.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.receivers', {
        abstract: true,
        url: '/receivers',
        template: '<ui-view/>'
      })
      .state('staff.receivers.list', {
        url: '',
        templateUrl: '/modules/receivers/client/views/staff/list-receivers.client.view.html',
        controller: 'ReceiversStaffListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'staff']
        }
      })
      .state('staff.receivers.create', {
        url: '/create',
        templateUrl: '/modules/receivers/client/views/staff/form-receiver.client.view.html',
        controller: 'ReceiversStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'staff']
        },
        resolve: {
          receiverResolve: newReceiver
        }
      })
      .state('staff.receivers.edit', {
        url: '/:receiverId/edit',
        templateUrl: '/modules/receivers/client/views/staff/form-receiver.client.view.html',
        controller: 'ReceiversStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['admin', 'staff']
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
