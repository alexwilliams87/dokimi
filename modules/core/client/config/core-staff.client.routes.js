(function () {
  'use strict';

  angular
    .module('core.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff', {
        abstract: true,
        url: '/staff',
        template: '<ui-view/>',
        data: {
          roles: ['staff']
        }
      });
  }
}());
