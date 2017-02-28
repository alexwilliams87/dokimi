(function () {
  'use strict';

  angular
    .module('questions.admin')
    .controller('QuestionsAdminListController', QuestionsAdminListController);

  QuestionsAdminListController.$inject = ['QuestionsService'];

  function QuestionsAdminListController(QuestionsService) {
    var vm = this;

    vm.questions = QuestionsService.query();
  }
}());
