(function () {
  'use strict';

  angular
    .module('forms')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Formateurs', // like admin --> to do
      state: 'forms',
      type: 'dropdown',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'forms', {
      title: 'Créer Questionnaire',
      state: 'forms.list',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'forms', {
      title: 'Vos Questionnaires',
      state: 'forms.list',
      roles: ['*']
    });
  }
}());
