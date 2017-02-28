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

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.question.$remove(function() {
          $state.go('admin.questions.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
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
        $state.go('admin.questions.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }
  }
}());
