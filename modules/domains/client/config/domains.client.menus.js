(function () {
  'use strict';

  angular
    .module('domains')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Domains',
      state: 'domains',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'domains', {
      title: 'List Domains',
      state: 'domains.list',
      roles: ['*']
    });
  }
}());
