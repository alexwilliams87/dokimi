(function () {
  'use strict';

  angular
    .module('questions.staff')
    .controller('QuestionsStaffController', QuestionsStaffController);

  QuestionsStaffController.$inject = ['$scope', '$state', '$window', 'questionResolve', 'Authentication', 'Notification', '$timeout', 'DomainsService', 'ThemesService'];

  function QuestionsStaffController($scope, $state, $window, question, Authentication, Notification, $timeout, DomainsService, ThemesService) {
    var vm = this;

    vm.question = $scope.question = question;
    vm.domains = $scope.domains = DomainsService.query();
    vm.themes = $scope.themes = ThemesService.query();
    vm.remove = $scope.remove = remove;
    vm.save = $scope.save = save;

    vm.authentication = Authentication;
    vm.form = {};

    // Remove existing Domain
    function remove() {
      if ($window.confirm('Etes vous sure de vouloir supprimer cette question ?')) {
        vm.question.$remove(function() {
          $state.go('admin.questions.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>Question supprimée !' });
        });
      }
    }

    // Save Domain
    function save(isValid) {
      if (!isValid) {
        return false;
      }
      $scope.question.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }

    function successCallback(res) {
      $state.go('staff.questions.list'); // should we send the User to the list or the updated Domain's view?
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question saved successfully!' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Question save error!' });
    }
  }
}());
