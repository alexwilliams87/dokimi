(function () {
  'use strict';

  angular
    .module('questions')
    .controller('FormsStaffListController', FormsStaffListController);

  FormsStaffListController.$inject = ['$window', 'Notification', '$mdDialog', 'FormsService'];

  function FormsStaffListController($window, Notification, $mdDialog, FormsService) {
    var vm = this;
    vm.remove = remove;
    vm.forms = FormsService.query();

    function remove(form, ev) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer un questionnaire')
        .textContent('Etes-vous sur de vouloir supprimer ce questionnaire ?')
        .ariaLabel('Suppresion d\'un questionnaire')
        .targetEvent(ev)
        .ok('Oui, j\'en suis certains')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        vm.forms.splice(vm.forms.indexOf(form), 1);
        form.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Question deleted successfully!' });
        });
      });
    }
  }
}());
