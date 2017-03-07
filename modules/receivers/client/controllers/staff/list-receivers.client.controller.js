(function () {
  'use strict';

  angular
  .module('receivers.staff')
  .controller('ReceiversStaffListController', ReceiversStaffListController);

  ReceiversStaffListController.$inject = ['$window', 'Notification', '$mdDialog', 'ReceiversService'];

  function ReceiversStaffListController($window, Notification, $mdDialog, ReceiversService) {
    var vm = this;
    vm.remove = remove;
    vm.receivers = ReceiversService.query();

    function remove(receiver) {

      var confirm = $mdDialog.confirm()
          .title('Voulez-vous supprimer cette liste ?')
          .textContent('Vous êtes sur le point de supprimer une liste. Voulez-vous continuer ?')
          .ariaLabel("Suppression d'une liste")
          .ok('Oui')
          .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        vm.receivers.splice(vm.receivers.indexOf(receiver), 1);
        receiver.$remove(function() {
          Notification.success({ message: '<i class="material-icons">check_circle</i> Liste supprimée avec succès' });
        });
      });
    }
  }
}());
