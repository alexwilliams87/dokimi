(function () {
  'use strict';

  // Configuring the Questions Admin module
  angular
    .module('questions.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'staff', {
      title: 'Liste des questions',
      state: 'staff.questions.list'
    });
  }
}());
