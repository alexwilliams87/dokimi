(function () {
  'use strict';

  angular
    .module('forms.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.forms', {
        abstract: true,
        url: '/forms',
        template: '<ui-view/>'
      })
      .state('staff.forms.list', {
        url: '',
        templateUrl: '/modules/forms/client/views/staff/list-forms.client.view.html',
        controller: 'FormsStaffListController',
        controllerAs: 'vm',
        data: {
          roles: ['staff']
        }
      })
      .state('staff.forms.create', {
        url: '/create',
        templateUrl: '/modules/forms/client/views/staff/create-form.client.view.html',
        controller: 'FormStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff']
        },
        resolve: {
          formResolve: newForm
        }
      })
      .state('staff.forms.edit', {
        url: '/:formId/edit',
        templateUrl: '/modules/forms/client/views/staff/create-form.client.view.html',
        controller: 'FormStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff']
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
