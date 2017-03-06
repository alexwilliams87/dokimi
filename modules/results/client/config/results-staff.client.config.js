(function () {
  'use strict';

  // Configuring the Questions Admin module
  angular
    .module('results.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des résultats',
      state: 'staff.results.list'
    });
  }
}());
