(function () {
  'use strict';

  angular
    .module('themes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('themes', {
        abstract: true,
        url: '/themes',
        template: '<ui-view/>'
      })
      .state('themes.list', {
        url: '',
        templateUrl: '/modules/themes/client/views/list-themes.client.view.html',
        controller: 'ThemesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Themes List'
        }
      })
      .state('themes.view', {
        url: '/:themeId',
        templateUrl: '/modules/themes/client/views/view-theme.client.view.html',
        controller: 'ThemesController',
        controllerAs: 'vm',
        resolve: {
          themeResolve: getTheme
        },
        data: {
          pageTitle: 'Theme {{ themeResolve.title }}'
        }
      });
  }

  getTheme.$inject = ['$stateParams', 'ThemesService'];

  function getTheme($stateParams, ThemesService) {
    return ThemesService.get({
      themeId: $stateParams.themeId
    }).$promise;
  }
}());
