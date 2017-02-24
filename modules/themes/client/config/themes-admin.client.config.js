(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('themes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Themes',
      state: 'admin.themes.list'
    });
  }
}());
