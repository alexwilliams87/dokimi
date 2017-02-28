(function () {
  'use strict';

  angular
    .module('receivers.admin')
    .controller('ReceiversAdminController', ReceiversAdminController);

  ReceiversAdminController.$inject = ['$scope', '$state', '$window', 'receiverResolve', 'Authentication', 'Notification', 'UsersService'];

  function ReceiversAdminController($scope, $state, $window, receiver, Authentication, Notification, UsersService) {
    var vm = this;

    vm.receiver = receiver;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;
    vm.users = UsersService.query();

    // Remove existing Receiver
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.receiver.$remove(function() {
          $state.go('admin.receivers.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Receiver deleted successfully!' });
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


      // Create a new receiver, or update the current instance
      // vm.receiver.createOrUpdate()
      //   .then(successCallback)
      //   .catch(errorCallback);

    function successCallback(res) {
      $state.go('admin.receivers.list'); // should we send the User to the list or the updated Receiver's view?
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Receiver saved successfully!' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Receiver save error!' });
    }
  }
}());
