(function () {
  'use strict';

  // Configuring the Forms Admin module
  angular
    .module('forms.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Forms',
      state: 'admin.forms.list'
    });
  }
}());
