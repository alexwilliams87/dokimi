(function () {
  'use strict';

  angular
    .module('forms.admin')
    .controller('FormsAdminListController', FormsAdminListController);

  FormsAdminListController.$inject = ['FormsService'];

  function FormsAdminListController(FormsService) {
    var vm = this;

    vm.forms = FormsService.query();
  }
}());
