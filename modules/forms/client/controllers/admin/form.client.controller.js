(function () {
  'use strict';

  angular
    .module('forms.admin')
    .controller('FormsAdminController', FormsAdminController);

  FormsAdminController.$inject = ['$scope', '$state', '$window', 'formResolve', 'Authentication', 'Notification'];

  function FormsAdminController($scope, $state, $window, form, Authentication, Notification) {
    var vm = this;

    vm.form = form;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.resmiss = {
      content: '',
      values: []
    };

    vm.select = [
      {
        value:   'Option 1',
        checked: true,
        readonly: true
      },
      {
        value:   'Option 2',
        checked: false,
        readonly: true
      }
    ];

    // Remove existing Form
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.form.$remove(function() {
          $state.go('admin.forms.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Form deleted successfully!' });
        });
      }
    }

    // Save Form
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.formForm');
        return false;
      }

      // Create a new form, or update the current instance
      vm.form.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.forms.list'); // should we send the User to the list or the updated Form's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Form saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Form save error!' });
      }
    }
  }
}());
