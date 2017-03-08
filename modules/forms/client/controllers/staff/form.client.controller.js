(function () {
  'use strict';

  angular
    .module('forms.staff')
    .controller('FormStaffController', FormStaffController);

  FormStaffController.$inject = ['$scope', '$state', '$window', 'formResolve', 'Authentication', 'Notification', '$mdDialog', 'DomainsService', 'ThemesService', 'UsersService', 'ReceiversService', 'QuestionsService'];

  function FormStaffController($scope, $state, $window, form, Authentication, Notification, $mdDialog, DomainsService, ThemesService, UsersService, ReceiversService, QuestionsService) {
    var vm = this;

    vm.domains = $scope.domains = DomainsService.query();
    vm.themes = $scope.themes = ThemesService.query();
    vm.users = $scope.users = UsersService.query();
    vm.receivers = $scope.receivers = ReceiversService.query();
    vm.questions = $scope.questions = QuestionsService.query();

    vm.form = form;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.save = save;
    vm.addQuestion = addQuestion;
    vm.removeQuestion = $scope.removeQuestion = removeQuestion;
    vm.showReceiversDialog = showReceiversDialog;
    vm.showQuestionsDialog = showQuestionsDialog;

    vm.form.questions = vm.form.questions || [];
    vm.form.receivers = vm.form.receivers || [];

    // Add a question
    function addQuestion() {
      vm.form.questions.push(new QuestionsService());
    }

    // Remove a question
    function removeQuestion(question) {
      vm.form.questions.splice(vm.form.questions.indexOf(question), 1);
    }

    // Remove existing Form
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.form.$remove(function() {
          $state.go('staff.forms.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Form deleted successfully!' });
        });
      }
    }

    // Save Form
    function save() {
      vm.form.questions.forEach(function(question) {
        // if question new
        if (question instanceof QuestionsService) {
          question.createOrUpdate();
        }
      });

      // Create a new form, or update the current instance
      vm.form.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('staff.forms.list'); // should we send the User to the list or the updated Form's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Form saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Form save error!' });
      }
    }

    // Open questions importer
    function showQuestionsDialog(ev) {
      $mdDialog.show({
        controller: DialogQuestionsController,
        templateUrl: '/modules/questions/client/views/staff/templates/questions-dialog-importer.client.view.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
      .then(function(questions) {
        var questionsCopy = [];
        angular.merge(questionsCopy, questions);
        vm.form.questions = vm.form.questions.concat(questionsCopy);
      });
    }

    function DialogQuestionsController($scope, $mdDialog) {
      $scope.domains = vm.domains;
      $scope.themes = vm.themes;
      $scope.questions = vm.questions;
      $scope.hide = $mdDialog.hide;
      $scope.cancel = $mdDialog.cancel;
      $scope.selected = [];

      $scope.answer = function(selected) {
        $mdDialog.hide(selected);
      };
    }

    // Open receivers importer
    function showReceiversDialog(ev) {
      $mdDialog.show({
        controller: DialogReceiversController,
        templateUrl: '/modules/receivers/client/views/staff/templates/receivers-dialog-importer.client.view.template.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
      .then(function(receivers) {
        vm.form.receivers = receivers;
      });
    }

    function DialogReceiversController($scope, $mdDialog) {
      $scope.domains = vm.domains;
      $scope.themes = vm.themes;
      $scope.users = vm.users;
      $scope.receivers = vm.receivers;
      $scope.hide = $mdDialog.hide;
      $scope.cancel = $mdDialog.cancel;
      $scope.selected = [];

      for (var receiver in vm.form.receivers) {
        for (var user in $scope.users) {
          if (vm.form.receivers[receiver]._id === $scope.users[user]._id) {
            $scope.selected.push($scope.users[user]);
            break;
          }
        }
      }

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

      $scope.answer = function(selected) {
        $mdDialog.hide(selected);
      };
    }
  }
}());
