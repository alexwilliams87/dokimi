(function () {
  'use strict';

  angular
    .module('forms.staff')
    .controller('FormsStaffListController', FormsStaffListController);

  FormsStaffListController.$inject = ['$http', '$window', 'Authentication', 'Notification', '$mdDialog', 'FormsService'];

  function FormsStaffListController($http, $window, Authentication, Notification, $mdDialog, FormsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.remove = remove;
    vm.submit = submit;
    vm.forms = FormsService.query();

    function remove(form) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer un questionnaire')
        .textContent('Etes-vous sur de vouloir supprimer ce questionnaire ?')
        .ariaLabel('Suppresion d\'un questionnaire')
        .ok('Oui, j\'en suis certains')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        vm.forms.splice(vm.forms.indexOf(form), 1);
        form.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Questionnaire supprimé avec succès !' });
        });
      });
    }

    function submit(form) {
      $http.get('/api/forms/' + form._id + '/submit').then(function(success) {
        form.submitted = true;
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Questionnaire envoyé avec succès !' });
      });
    }

  }
}());
