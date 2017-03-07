(function () {
  'use strict';

  angular
    .module('questions')
    .controller('QuestionsStaffListController', QuestionsStaffListController);

  QuestionsStaffListController.$inject = ['$window', 'Notification', '$mdDialog', 'ThemesService', 'DomainsService', 'QuestionsService'];

  function QuestionsStaffListController($window, Notification, $mdDialog, ThemesService, DomainsService, QuestionsService) {
    var vm = this;
    vm.remove = remove;
    vm.questions = QuestionsService.query();
    vm.themes = ThemesService.query();
    vm.domains = DomainsService.query();

    function remove(question) {
      var confirm = $mdDialog.confirm()
        .title('Voulez-vous supprimer cette question ?')
        .textContent('Vous êtes sur le point de supprimer une question. Voulez-vous continuer ?')
        .ariaLabel('Suppression d\'une question')
        .ok('Oui')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        vm.questions.splice(vm.questions.indexOf(question), 1);
        question.$remove(function() {
          Notification.success({ message: '<i class="material-icons">check_circle</i> Question supprimée avec succès' });
        });
      });
    }
  }
}());
