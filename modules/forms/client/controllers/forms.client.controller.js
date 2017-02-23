(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$scope', 'formResolve', 'Authentication'];

  function FormsController($scope, form, Authentication) {
    var vm = this;

    vm.form = form;
    vm.authentication = Authentication;

  }
}());
