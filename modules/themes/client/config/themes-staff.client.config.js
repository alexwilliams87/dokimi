(function () {
  'use strict';

  // Configuring the Questions Admin module
  angular
    .module('themes.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des thèmes',
      state: 'staff.themes.list'
    });
  }
}());
