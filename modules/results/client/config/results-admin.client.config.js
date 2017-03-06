(function () {
  'use strict';

  // Configuring the Results Admin module
  angular
    .module('results.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Results',
      state: 'admin.results.list'
    });
  }
}());
