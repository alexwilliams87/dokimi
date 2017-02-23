(function () {
  'use strict';

  angular
    .module('forms.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.forms', {
        abstract: true,
        url: '/forms',
        template: '<ui-view/>'
      })
      .state('admin.forms.list', {
        url: '',
        templateUrl: '/modules/forms/client/views/admin/list-forms.client.view.html',
        controller: 'FormsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.forms.create', {
        url: '/create',
        templateUrl: '/modules/forms/client/views/admin/form-form.client.view.html',
        controller: 'FormsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          formResolve: newForm
        }
      })
      .state('admin.forms.edit', {
        url: '/:formId/edit',
        templateUrl: '/modules/forms/client/views/admin/form-form.client.view.html',
        controller: 'FormsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          formResolve: getForm
        }
      });
  }

  getForm.$inject = ['$stateParams', 'FormsService'];

  function getForm($stateParams, FormsService) {
    return FormsService.get({
      formId: $stateParams.formId
    }).$promise;
  }

  newForm.$inject = ['FormsService'];

  function newForm(FormsService) {
    return new FormsService();
  }
}());
