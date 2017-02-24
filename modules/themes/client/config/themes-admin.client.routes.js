(function () {
  'use strict';

  angular
    .module('themes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.themes', {
        abstract: true,
        url: '/themes',
        template: '<ui-view/>'
      })
      .state('admin.themes.list', {
        url: '',
        templateUrl: '/modules/themes/client/views/admin/list-themes.client.view.html',
        controller: 'ThemesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.themes.create', {
        url: '/create',
        templateUrl: '/modules/themes/client/views/admin/form-theme.client.view.html',
        controller: 'ThemesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          themeResolve: newTheme
        }
      })
      .state('admin.themes.edit', {
        url: '/:themeId/edit',
        templateUrl: '/modules/themes/client/views/admin/form-theme.client.view.html',
        controller: 'ThemesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          themeResolve: getTheme
        }
      });
  }

  getTheme.$inject = ['$stateParams', 'ThemesService'];

  function getTheme($stateParams, ThemesService) {
    return ThemesService.get({
      themeId: $stateParams.themeId
    }).$promise;
  }

  newTheme.$inject = ['ThemesService'];

  function newTheme(ThemesService) {
    return new ThemesService();
  }
}());
