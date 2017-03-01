(function () {
  'use strict';

  angular
    .module('questions.staff')
    .controller('QuestionsStaffController', QuestionsStaffController);

  QuestionsStaffController.$inject = ['$scope', '$state', '$window', 'questionResolve', 'Authentication', 'Notification', '$timeout', 'DomainsService', 'ThemesService'];

  function QuestionsStaffController($scope, $state, $window, question, Authentication, Notification, $timeout, DomainsService, ThemesService) {
    var vm = this;

    $scope.question = question;

    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;

    vm.domains = DomainsService.query();
    vm.themes  = ThemesService.query();

    // Remove existing Domain
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.domain.$remove(function() {
          $state.go('admin.domains.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Domain deleted successfully!' });
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
