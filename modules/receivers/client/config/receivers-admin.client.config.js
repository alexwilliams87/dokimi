(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('receivers.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Receivers',
      state: 'admin.receivers.list'
    });
  }
}());
