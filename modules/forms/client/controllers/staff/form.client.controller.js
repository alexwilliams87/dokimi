(function () {
  'use strict';

  angular
    .module('forms.admin')
    .controller('FormStaffController', FormStaffController);

  FormStaffController.$inject = ['$scope', '$state', '$window', 'formResolve', 'Authentication', 'Notification', '$mdDialog', 'DomainsService', 'ThemesService', 'UsersService'];

  function FormStaffController($scope, $state, $window, form, Authentication, Notification, $mdDialog, DomainsService, ThemesService, UsersService) {
    var vm = this;

    vm.form = form;
    vm.authentication = Authentication;

    vm.remove = remove;
    vm.save = save;

    vm.domains = DomainsService.query();
    vm.themes  = ThemesService.query();
    vm.users   = UsersService.query();

    vm.form.questions = [];

    $scope.users = UsersService.query();

    vm.add = function() {
      vm.form.questions.push({});
    }

    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/modules/forms/client/views/staff/templates/receivers-dialog.client.view.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };

    var originatorEv;

    vm.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

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

    function DialogController($scope, $mdDialog) {
      $scope.users = vm.users;

      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  }
}());
