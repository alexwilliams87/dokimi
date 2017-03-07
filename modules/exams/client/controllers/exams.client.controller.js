(function () {
  'use strict';

  angular
    .module('exams')
    .controller('ExamsController', ExamsController);

  ExamsController.$inject = ['$scope', '$http', 'examResolve', 'Authentication'];

  function ExamsController($scope, $http, exam, Authentication) {
    var vm = this;

    vm.exam = exam;
    vm.question = $scope.question = vm.exam.form.questions[vm.exam.answers.length];

    vm.authentication = Authentication;

    vm.send = function() {
      $http({
        method: 'POST',
        url: '/api/answers',
        data: {
          offsetQuestion: vm.exam.answers.length,
          form: vm.form,
          results: vm.question.body.results
        }
      }).then(function successCallback(response) {
        vm.exam.answers.push(response.data._id);

        vm.exam.createOrUpdate().then(function(success) {
          if (vm.exam.form.questions[vm.exam.answers.length]) {
            vm.question = $scope.question = vm.exam.form.questions[vm.exam.answers.length];
          }
        });
      });
    }

  }
}());
