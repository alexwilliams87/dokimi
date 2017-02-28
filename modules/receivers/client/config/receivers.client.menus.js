(function () {
  'use strict';

  angular
    .module('receivers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Receivers',
      state: 'receivers',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'receivers', {
      title: 'List Receivers',
      state: 'receivers.list',
      roles: ['*']
    });
  }
}());
