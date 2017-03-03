(function () {
  'use strict';

  angular
    .module('forms.admin')
    .controller('FormStaffController', FormStaffController);

  FormStaffController.$inject = ['$scope', '$state', '$window', 'formResolve', 'Authentication', 'Notification', '$mdDialog', 'DomainsService', 'ThemesService', 'UsersService', 'ReceiversService', 'QuestionsService'];

  function FormStaffController($scope, $state, $window, form, Authentication, Notification, $mdDialog, DomainsService, ThemesService, UsersService, ReceiversService, QuestionsService) {
    var vm = this;

    vm.domains = $scope.domains = DomainsService.query();
    vm.themes = $scope.themes = ThemesService.query();
    vm.users = $scope.users = UsersService.query();
    vm.receivers = $scope.receivers = ReceiversService.query();
    vm.form = form;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.save = save;
    vm.showReceiversDialog = showReceiversDialog;

    // Replace by new formService
    vm.form.questions = [];
    vm.form.receivers = [];

    $scope.save = function(question) {
      question.createOrUpdate()
        .then(function() {
          return vm.form.createOrUpdate();
        })
        .then(function() {
          vm.form.questions.push(new QuestionsService())
        });
    }

    vm.add = function() {
      vm.form.questions.push(new QuestionsService());
    }

    // Open receivers list
    function showReceiversDialog(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/modules/receivers/client/views/staff/templates/receivers-dialog-selected.client.view.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
      .then(function(res) {
        vm.form.receivers = res;
      });
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
      $scope.domains = vm.domains;
      $scope.themes = vm.themes;
      $scope.users = vm.users;
      $scope.receivers = vm.receivers;

      $scope.selected = vm.form.receivers;

      $scope.import = function() {
        $scope.selected = [];

        $scope.importedUsers.forEach(function(importedUser) {
          $scope.users.forEach(function(user) {
            if (user._id === importedUser._id) {
              $scope.selected.push(user);
            }
          });
        });
      }

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
