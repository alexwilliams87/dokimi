(function () {
  'use strict';

  // Configuring the Questions Admin module
  angular
    .module('exams.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des examens',
      state: 'staff.exams.list'
    });
  }
}());
