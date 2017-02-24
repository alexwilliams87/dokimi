(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('domains.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Domains',
      state: 'admin.domains.list'
    });
  }
}());
