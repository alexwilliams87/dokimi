(function () {
  'use strict';

  // Configuring the Questions Admin module
  angular
    .module('domains.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des domaines',
      state: 'staff.domains.list'
    });
  }
}());
