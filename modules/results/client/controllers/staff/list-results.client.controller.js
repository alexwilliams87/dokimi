(function () {
  'use strict';

  angular
    .module('questions')
    .controller('ResultsStaffListController', ResultsStaffListController);

  ResultsStaffListController.$inject = ['$window', 'Notification', '$mdDialog', 'ResultsService'];

  function ResultsStaffListController($window, Notification, $mdDialog, ResultsService) {
    var vm = this;
    vm.remove = remove;
    vm.results = ResultsService.query();

    function remove(result, ev) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer un questionnaire')
        .textContent('Etes-vous sur de vouloir supprimer ce questionnaire ?')
        .ariaLabel('Suppresion d\'un questionnaire')
        .targetEvent(ev)
        .ok('Oui, j\'en suis certains')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        vm.results.splice(vm.results.indexOf(result), 1);
        result.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question deleted successfully!' });
        });
      });
    }
  }
}());
