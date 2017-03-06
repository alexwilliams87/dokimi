(function () {
  'use strict';

  angular
    .module('questions')
    .controller('QuestionsListController', QuestionsListController);

  QuestionsListController.$inject = ['$window', 'Notification', '$mdDialog', 'ThemesService', 'DomainsService', 'QuestionsService'];

  function QuestionsListController($window, Notification, $mdDialog, ThemesService, DomainsService, QuestionsService) {
    var vm = this;
    vm.remove 	= remove;
    vm.questions = QuestionsService.query();
    vm.themes = ThemesService.query();
    vm.domains = DomainsService.query();

    function remove(question, ev) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer une question')
        .textContent('Etes-vous sur de vouloir supprimer cette question ?')
        .ariaLabel('Suppresion d\'une question')
        .targetEvent(ev)
        .ok('Oui, j\'en suis certains')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        vm.questions.splice(vm.questions.indexOf(question), 1);
        question.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question deleted successfully!' });
        });
      });
    }
  }
}());
