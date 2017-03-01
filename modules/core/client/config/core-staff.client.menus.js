(function () {
  'use strict';

  angular
    .module('core.staff')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Formateur',
      state: 'staff',
      type: 'dropdown',
      roles: ['staff']
    });
  }
}());
