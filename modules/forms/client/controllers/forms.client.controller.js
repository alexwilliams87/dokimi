(function () {
  'use strict';

  angular
    .module('forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$scope', 'Authentication'];

  function FormsController($scope, Authentication) {
    var vm = this;

<<<<<<< HEAD
    vm.form = form;

=======
    // vm.form = form;
>>>>>>> f9ee106d30bdae2683d6b684e614dd160e117342
    vm.authentication = Authentication;
  }
}());
