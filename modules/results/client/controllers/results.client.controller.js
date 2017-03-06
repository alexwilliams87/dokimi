(function () {
  'use strict';

  angular
    .module('results')
    .controller('ResultsController', ResultsController);

  ResultsController.$inject = ['$scope', 'resultResolve', 'Authentication'];

  function ResultsController($scope, result, Authentication) {
    var vm = this;

    vm.result = result;
    vm.authentication = Authentication;
  }
}());
