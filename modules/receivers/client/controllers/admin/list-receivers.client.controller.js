(function () {
  'use strict';

  angular
  .module('receivers.admin')
  .controller('ReceiversAdminListController', ReceiversAdminListController);

  ReceiversAdminListController.$inject = ['ReceiversService', '$window', 'Notification', '$mdDialog'];

  function ReceiversAdminListController(ReceiversService, $window, Notification, $mdDialog) {
    var vm 		= this;
    vm.remove 	= remove;
    vm.receivers 	= ReceiversService.query();

    function remove(receiver, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this receiver ?')
          .textContent('You are going to delete a receiver. Would you like to continue ?')
          .ariaLabel('Deleting a receiver')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.receivers.splice(vm.receivers.indexOf(receiver), 1);
        receiver.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Receiver deleted successfully!' });
        });
      });
    }
  }
}());
