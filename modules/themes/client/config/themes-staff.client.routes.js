(function () {
  'use strict';

  angular
    .module('themes.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.themes', {
        abstract: true,
        url: '/themes',
        template: '<ui-view/>'
      })
      .state('staff.themes.list', {
        url: '',
        templateUrl: '/modules/themes/client/views/staff/list-themes.client.view.html',
        controller: 'ThemesStaffListController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Liste des thèmes'
        }
      })
      .state('staff.themes.create', {
        url: '/create',
        templateUrl: '/modules/themes/client/views/staff/form-theme.client.view.html',
        controller: 'ThemesStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Créer un thème'
        },
        resolve: {
          themeResolve: newTheme
        }
      })
      .state('staff.themes.edit', {
        url: '/:themeId/edit',
        templateUrl: '/modules/themes/client/views/staff/form-theme.client.view.html',
        controller: 'ThemesStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Editer un thème'
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
