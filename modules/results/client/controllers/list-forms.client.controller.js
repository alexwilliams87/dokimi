(function () {
  'use strict';

  angular
    .module('results')
    .controller('ResultsListController', ResultsListController);

  ResultsListController.$inject = ['ResultsService'];

  function ResultsListController(ResultsService) {
    var vm = this;

    vm.results = ResultsService.query();
  }
}());
