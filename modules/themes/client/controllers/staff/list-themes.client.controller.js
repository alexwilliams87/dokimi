(function () {
  'use strict';

  angular
  .module('themes.staff')
  .controller('ThemesStaffListController', ThemesStaffListController);

  ThemesStaffListController.$inject = ['$window', 'Notification', '$mdDialog', 'ThemesService', 'DomainsService'];

  function ThemesStaffListController($window, Notification, $mdDialog, ThemesService, DomainsService) {
    var vm = this;
    vm.remove = remove;
    vm.themes = ThemesService.query();
    vm.domains = DomainsService.query();

    function remove(theme) {

      var confirm = $mdDialog.confirm()
          .title('Voulez-vous supprimer ce thème ?')
          .textContent('Vous êtes sur le point de supprimer un thème. Voulez-vous continuer ?')
          .ariaLabel('Suppression d\'un thème')
          .ok('Oui')
          .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        vm.themes.splice(vm.themes.indexOf(theme), 1);
        theme.$remove(function() {
          Notification.success({ message: '<i class="material-icons">check_circle</i> Thème supprimé avec succès' });
        });
      });
    }
  }
}());
