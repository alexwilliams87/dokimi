(function () {
  'use strict';

  angular
    .module('questions')
    .controller('QuestionsListController', QuestionsListController);

<<<<<<< HEAD
  QuestionsListController.$inject = ['$window', 'Notification', '$mdDialog', 'ThemesService', 'DomainsService', 'QuestionsService'];

  function QuestionsListController($window, Notification, $mdDialog, ThemesService, DomainsService, QuestionsService) {
=======
  QuestionsListController.$inject = ['QuestionsService', '$window', 'Notification', '$mdDialog', 'ThemesService', 'DomainsService'];

  function QuestionsListController(QuestionsService, $window, Notification, $mdDialog, ThemesService, DomainsService) {
>>>>>>> f9ee106d30bdae2683d6b684e614dd160e117342
    var vm = this;
    vm.remove 	= remove;
    vm.questions = QuestionsService.query();
    vm.themes = ThemesService.query();
    vm.domains = DomainsService.query();

<<<<<<< HEAD
    function remove(question, ev) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer une question')
        .textContent('Etes-vous sur de vouloir supprimer cette question ?')
        .ariaLabel('Suppresion d\'une question')
        .targetEvent(ev)
        .ok('Oui, j\'en suis certains')
        .cancel('Non');
=======

    function remove(question, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this question ?')
          .textContent('You are going to delete a question. Would you like to continue ?')
          .ariaLabel('Deleting a question')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');
>>>>>>> f9ee106d30bdae2683d6b684e614dd160e117342

      $mdDialog.show(confirm).then(function() {
        vm.questions.splice(vm.questions.indexOf(question), 1);
        question.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question deleted successfully!' });
        });
      });
    }
  }
}());
