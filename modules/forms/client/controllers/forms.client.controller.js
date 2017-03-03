(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$scope', 'Authentication'];

  function FormsController($scope, Authentication) {
    var vm = this;

    // vm.form = form;
    vm.authentication = Authentication;
  }
}());
