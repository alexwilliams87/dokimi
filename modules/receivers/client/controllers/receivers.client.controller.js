(function () {
  'use strict';

  angular
    .module('receivers')
    .controller('ReceiversController', ReceiversController);

  ReceiversController.$inject = ['$scope', 'receiverResolve', 'Authentication'];

  function ReceiversController($scope, receiver, Authentication) {
    var vm = this;

    vm.receiver = receiver;
    vm.authentication = Authentication;

  }
}());
