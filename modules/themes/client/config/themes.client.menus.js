(function () {
  'use strict';

  angular
    .module('themes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Themes',
      state: 'themes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'themes', {
      title: 'List Themes',
      state: 'themes.list',
      roles: ['*']
    });
  }
}());
