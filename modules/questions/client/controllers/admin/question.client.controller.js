(function () {
  'use strict';

  angular
    .module('questions.admin')
    .controller('QuestionsAdminController', QuestionsAdminController);

  QuestionsAdminController.$inject = ['$scope', '$state', '$window', 'questionResolve', 'Authentication', 'Notification'];

  function QuestionsAdminController($scope, $state, $window, question, Authentication, Notification) {
    var vm = this;

    vm.question = question;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Question
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.question.$remove(function() {
          $state.go('admin.questions.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question deleted successfully!' });
        });
      }
    }

    // Save Question
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.questionForm');
        return false;
      }

      // Create a new question, or update the current instance
      vm.question.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.questions.list'); // should we send the User to the list or the updated Question's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Question save error!' });
      }
    }
  }
}());
