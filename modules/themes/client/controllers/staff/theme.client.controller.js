(function () {
  'use strict';

  angular
    .module('themes.staff')
    .controller('ThemesStaffController', ThemesStaffController);

  ThemesStaffController.$inject = ['$scope', '$state', '$window', 'themeResolve', 'Authentication', 'Notification', '$timeout', 'DomainsService'];

  function ThemesStaffController($scope, $state, $window, theme, Authentication, Notification, $timeout, DomainsService) {
    var vm = this;

    vm.theme = theme;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.domains = DomainsService.query();

    // Remove existing Theme
    function remove() {
      if ($window.confirm('Êtes-vous certain de vouloir supprimer ceci ?')) {
        vm.theme.$remove(function() {
          $state.go('staff.themes.list');
          Notification.success({ message: '<i class="material-icons">check_circle</i> Thème supprimé avec succès' });
        });
      }
    }

    // Save Theme
    function save(isValid) {
      if (!isValid) {
        return false;
      }

      vm.theme.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }

    function successCallback(res) {
      $state.go('staff.themes.list'); // should we send the User to the list or the updated Theme's view?
      Notification.success({ message: '<i class="material-icons">check_circle</i> Thème sauvegardé avec succès' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="material-icons">report_problem</i> Erreur lors de la sauvegarde' });
    }
  }
}());
