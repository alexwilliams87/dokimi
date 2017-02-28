(function () {
  'use strict';

  angular
    .module('receivers.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('receivers', {
        abstract: true,
        url: '/receivers',
        template: '<ui-view/>'
      })
      .state('receivers.list', {
        url: '',
        templateUrl: '/modules/receivers/client/views/list-receivers.client.view.html',
        controller: 'ReceiversListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Receivers List'
        }
      })
      .state('receivers.view', {
        url: '/:receiverId',
        templateUrl: '/modules/receivers/client/views/view-receiver.client.view.html',
        controller: 'ReceiversController',
        controllerAs: 'vm',
        resolve: {
          receiverResolve: getReceiver
        },
        data: {
          pageTitle: 'Receiver {{ receiverResolve.title }}'
        }
      });
  }

  getReceiver.$inject = ['$stateParams', 'ReceiversService'];

  function getReceiver($stateParams, ReceiversService) {
    return ReceiversService.get({
      receiverId: $stateParams.receiverId
    }).$promise;
  }
}());
