(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['ExamsCandidateService'];

  function HomeController(ExamsCandidateService) {
    var vm = this;

    vm.exams = ExamsCandidateService.query();
  }
}());
