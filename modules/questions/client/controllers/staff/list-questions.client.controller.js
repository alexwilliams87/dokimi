(function () {
  'use strict';

  angular
    .module('questions')
    .controller('QuestionsListController', QuestionsListController);

  QuestionsListController.$inject = ['QuestionsService', '$window', 'Notification', '$mdDialog', 'ThemesService', 'DomainsService'];

  function QuestionsListController(QuestionsService, $window, Notification, $mdDialog, ThemesService, DomainsService) {
    var vm = this;
    vm.remove 	= remove;
    vm.questions = QuestionsService.query();
    vm.themes = ThemesService.query();
    vm.domains = DomainsService.query();


    function remove(question, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this question ?')
          .textContent('You are going to delete a question. Would you like to continue ?')
          .ariaLabel('Deleting a question')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.questions.splice(vm.questions.indexOf(question), 1);
        question.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question deleted successfully!' });
        });
      });
    }
  }
}());
