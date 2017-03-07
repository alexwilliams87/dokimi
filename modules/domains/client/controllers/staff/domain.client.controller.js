(function () {
  'use strict';

  angular
    .module('domains.staff')
    .controller('DomainsStaffController', DomainsStaffController);

  DomainsStaffController.$inject = ['$scope', '$state', '$window', 'domainResolve', 'Authentication', 'Notification', '$timeout'];

  function DomainsStaffController($scope, $state, $window, domain, Authentication, Notification, $timeout) {
    var vm = this;

    vm.domain = domain;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Domain
    function remove() {
      if ($window.confirm('Êtes-vous certain de vouloir supprimer ceci ?')) {
        vm.domain.$remove(function() {
          $state.go('staff.domains.list');
          Notification.success({ message: '<i class="material-icons">check_circle</i> Domaine supprimé avec succès' });
        });
      }
    }

    // Save Domain
    function save(isValid) {
      if (!isValid) {
        return false;
      }

      vm.domain.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }

    function successCallback(res) {
      $state.go('staff.domains.list'); // should we send the User to the list or the updated Domain's view?
      Notification.success({ message: '<i class="material-icons">check_circle</i> Domaine sauvegardé avec succès' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="material-icons">report_problem</i> Erreur lors de la sauvegarde' });
    }
  }
}());
