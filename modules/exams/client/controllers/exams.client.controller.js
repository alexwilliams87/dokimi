(function () {
  'use strict';

  angular
    .module('exams')
    .controller('ExamsController', ExamsController);

  ExamsController.$inject = ['$scope', '$http', 'examResolve', 'Authentication'];

  function ExamsController($scope, $http, exam, Authentication) {
    var vm = this;

    vm.exam = exam;
    $scope.question = vm.exam.form.questions[vm.exam.answers.length];
    vm.authentication = Authentication;
    vm.validate = validate;

    function validate() {
      var answer = {
        offsetQuestion: vm.exam.answers.length,
        form: vm.form,
        results: $scope.question.body.results
      };

      vm.exam.answers.push(answer);

      vm.exam.$save().then(function(success) {
        if (vm.exam.form.questions[vm.exam.answers.length]) {
          $scope.question = $scope.question = vm.exam.form.questions[vm.exam.answers.length];
        }
      });
    }

  }
}());
