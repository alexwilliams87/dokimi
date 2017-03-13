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
    vm.unsubmit = unsubmit;
    vm.forms = FormsService.query();

    function remove(form) {
      var confirm = $mdDialog.confirm()
        .title('Supprimer un questionnaire')
        .textContent('Etes-vous sur de vouloir supprimer ce questionnaire ?')
        .ariaLabel('Suppresion d\'un questionnaire')
        .ok('Oui')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        vm.forms.splice(vm.forms.indexOf(form), 1);
        form.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Questionnaire supprimé avec succès !' });
        });
      });
    }

    function submit(form) {
      var confirm = $mdDialog.confirm()
        .title('Engager un questionnaire')
        .textContent('Etes-vous sur de vouloir engager ce questionnaire ?')
        .ariaLabel('Engagement d\'un questionnaire')
        .ok('Oui')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        $http.get('/api/forms/' + form._id + '/submit').then(function(success) {
          form.submitted = true;
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Questionnaire engagé avec succès !' });
        });
      });
    }

    function unsubmit(form) {
      var confirm = $mdDialog.confirm()
        .title('Désengager un questionnaire')
        .textContent('Etes-vous sur de vouloir désengager ce questionnaire ?')
        .ariaLabel('Désengagement d\'un questionnaire')
        .ok('Oui')
        .cancel('Non');

      $mdDialog.show(confirm).then(function() {
        $http.get('/api/forms/' + form._id + '/unsubmit').then(function(success) {
          form.submitted = false;
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Questionnaire désengagé avec succès !' });
        },
        function(error) {
          Notification.error({ message: error.data.message, title: '<i class="material-icons">report_problem</i> Erreur lors du désengagement' });
        });
      });
    }

  }
}());
