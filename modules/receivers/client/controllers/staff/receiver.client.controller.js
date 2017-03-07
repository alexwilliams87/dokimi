(function () {
  'use strict';

  angular
    .module('receivers.staff')
    .controller('ReceiversStaffController', ReceiversStaffController);

  ReceiversStaffController.$inject = ['$scope', '$state', '$window', 'receiverResolve', 'Authentication', 'Notification', 'UsersService'];

  function ReceiversStaffController($scope, $state, $window, receiver, Authentication, Notification, UsersService) {
    var vm = this;

    vm.receiver = receiver;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.users = UsersService.query();

    // Remove existing Receiver
    function remove() {
      if ($window.confirm('Êtes-vous certain de vouloir supprimer ceci ?')) {
        vm.receiver.$remove(function() {
          $state.go('staff.receivers.list');
          Notification.success({ message: '<i class="material-icons">check_circle</i> Liste supprimée avec succès' });
        });
      }
    }

    // Save Receiver
    function save(isValid) {
      if (!isValid) {
        return false;
      }

      vm.receiver.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }

    function successCallback(res) {
      $state.go('staff.receivers.list');
      Notification.success({ message: '<i class="material-icons">check_circle</i> Liste sauvegardée avec succès' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="material-icons">report_problem</i> Erreur lors de la sauvegarde' });
    }
  }
}());
