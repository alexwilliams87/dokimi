(function () {
  'use strict';

  angular
    .module('questions')
    .controller('QuestionsController', QuestionsController);

  QuestionsController.$inject = ['$scope', 'questionResolve', 'Authentication'];

  function QuestionsController($scope, question, Authentication) {
    var vm = this;

    vm.question = $scope.question = question;
    vm.authentication = Authentication;

  }
}());
