(function () {
  'use strict';

  angular
  .module('themes.admin')
  .controller('ThemesAdminListController', ThemesAdminListController);

  ThemesAdminListController.$inject = ['ThemesService', '$window', 'Notification', '$mdDialog', 'DomainsService'];

  function ThemesAdminListController(ThemesService, $window, Notification, $mdDialog, DomainsService) {
    var vm 		= this;
    vm.remove 	= remove;
    vm.themes 	= ThemesService.query();
    vm.domains = DomainsService.query();

    function remove(theme, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this theme ?')
          .textContent('You are going to delete a theme. Would you like to continue ?')
          .ariaLabel('Deleting a theme')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.themes.splice(vm.themes.indexOf(theme), 1);
        theme.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Theme deleted successfully!' });
        });
      });
    }
  }
}());
