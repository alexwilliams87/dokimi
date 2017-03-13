(function () {
  'use strict';

  angular
    .module('exams.staff')
    .controller('ExamsStaffListController', ExamsStaffListController);

  ExamsStaffListController.$inject = ['$mdDialog', 'ExamsService', 'dateService', 'Notification'];

  function ExamsStaffListController($mdDialog, ExamsService, dateService, Notification) {
    var vm = this;

    vm.exams = ExamsService.query({ search: 'ownByMe' });
    vm.dateConvert = dateService.convert;
    vm.remove = remove;

    function remove(exam) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer un examen')
        .textContent('Etes-vous sur de vouloir supprimer cet examen ?')
        .ariaLabel('Suppresion d\'un examen')
        .ok('Oui')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        vm.exams.splice(vm.exams.indexOf(exam), 1);
        exam.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Examen supprimé avec succès !' });
        });
      });
    }
  }
}());
