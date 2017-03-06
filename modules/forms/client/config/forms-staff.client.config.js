(function () {
  'use strict';

  // Configuring the Questions Admin module
  angular
    .module('forms.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des questionnaires',
      state: 'staff.forms.list'
    });
  }
}());
