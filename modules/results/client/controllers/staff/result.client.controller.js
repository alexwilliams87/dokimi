(function () {
  'use strict';

  angular
    .module('results.admin')
    .controller('ResultStaffController', ResultStaffController);

  ResultStaffController.$inject = ['$scope', '$state', '$window', 'resultResolve', 'Authentication', 'Notification', '$mdDialog', 'DomainsService', 'ThemesService', 'UsersService', 'ReceiversService', 'QuestionsService'];

  function ResultStaffController($scope, $state, $window, result, Authentication, Notification, $mdDialog, DomainsService, ThemesService, UsersService, ReceiversService, QuestionsService) {
    var vm = this;

    vm.domains = $scope.domains = DomainsService.query();
    vm.themes = $scope.themes = ThemesService.query();
    vm.users = $scope.users = UsersService.query();
    vm.receivers = $scope.receivers = ReceiversService.query();
    vm.questions = $scope.questions = QuestionsService.query();

    vm.result = result;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.save = save;
    vm.addQuestion = addQuestion;
    vm.removeQuestion = $scope.removeQuestion = removeQuestion;
    vm.showReceiversDialog = showReceiversDialog;
    vm.showQuestionsDialog = showQuestionsDialog;

    // Replace by new resultService
    if (!vm.result._id) {
      vm.result.questions = [];
      vm.result.receivers = [];
    }

    // Add a question
    function addQuestion() {
      vm.result.questions.push(new QuestionsService());
    }

    // Remove a question
    function removeQuestion(question) {
      vm.result.questions.splice(vm.result.questions.indexOf(question), 1);
    }

    // Remove existing Result
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.result.$remove(function() {
          $state.go('staff.results.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Result deleted successfully!' });
        });
      }
    }

    // Save Result
    function save() {
      vm.result.questions.forEach(function(question) {
        // if question new
        if (question instanceof QuestionsService) {
          question.createOrUpdate();
        }
      });

      // Create a new result, or update the current instance
      vm.result.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('staff.results.list'); // should we send the User to the list or the updated Result's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Result saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Result save error!' });
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
        vm.result.questions = vm.result.questions.concat(questionsCopy);
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
        vm.result.receivers = receivers;
      });
    }

    function DialogReceiversController($scope, $mdDialog) {
      $scope.domains = vm.domains;
      $scope.themes = vm.themes;
      $scope.users = vm.users;
      $scope.receivers = vm.receivers;
      $scope.hide = $mdDialog.hide;
      $scope.cancel = $mdDialog.cancel;
      $scope.selected = vm.result.receivers;

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
