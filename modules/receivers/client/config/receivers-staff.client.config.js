(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('receivers.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des destinataires',
      state: 'staff.receivers.list'
    });
  }
}());