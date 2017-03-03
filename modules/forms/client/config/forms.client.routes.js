(function () {
  'use strict';

  angular
    .module('forms.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('forms', {
        abstract: true,
        url: '/forms',
        template: '<ui-view/>'
      })
      .state('forms.list', {
        url: '',
        templateUrl: '/modules/forms/client/views/staff/list-forms.client.view.html',
        controller: 'FormsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Forms List'
        }
      })
      .state('forms.view', {
        url: '/test',
        templateUrl: '/modules/forms/client/views/view-form.client.view.html',
        controller: 'FormsController',
        controllerAs: 'vm',
        // resolve: {
        //   formResolve: getForm
        // },
        data: {
          pageTitle: 'Form {{ formResolve.title }}'
        }
      });
  }

  getForm.$inject = ['$stateParams', 'FormsService'];

  function getForm($stateParams, FormsService) {
    return FormsService.get({
      formId: $stateParams.formId
    }).$promise;
  }
}());
