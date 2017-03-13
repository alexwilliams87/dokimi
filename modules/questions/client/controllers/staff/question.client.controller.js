(function () {
  'use strict';

  angular
    .module('questions.staff')
    .controller('QuestionsStaffController', QuestionsStaffController);

  QuestionsStaffController.$inject = ['$scope', '$state', '$window', 'questionResolve', 'Authentication', 'Notification', '$timeout', 'DomainsService', 'ThemesService'];

  function QuestionsStaffController($scope, $state, $window, question, Authentication, Notification, $timeout, DomainsService, ThemesService) {
    var vm = this;

    vm.question = $scope.question = question;
    vm.domains = $scope.domains = DomainsService.query();
    vm.themes = $scope.themes = ThemesService.query();

    vm.authentication = Authentication;
    vm.remove = $scope.removeQuestion = remove;
    vm.save = $scope.saveQuestion = save;

    // Remove existing Question
    function remove() {
      if ($window.confirm('Êtes-vous certain de vouloir supprimer cette question ?')) {
        vm.question.$remove(function() {
          $state.go('staff.questions.list');
          Notification.success({ message: '<i class="material-icons">check_circle</i> Question supprimée avec succès' });
        });
      }
    }

    // Save Event From Question Directives
    $scope.$on('readyToSave', function(event, data) {
      $scope.question.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    });

    // Save Question
    function save(isValid) {
      if (!isValid) {
        return false;
      }

      $scope.$broadcast('eventSaveData');
    }

    function successCallback(res) {
      $state.go('staff.questions.list');
      Notification.success({ message: '<i class="material-icons">check_circle</i> Question sauvegardée avec succès' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="material-icons">report_problem</i> Erreur lors de la sauvegarde' });
    }
  }
}());
