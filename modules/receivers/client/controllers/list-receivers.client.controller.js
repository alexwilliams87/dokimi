(function () {
  'use strict';

  angular
    .module('receivers')
    .controller('ReceiversListController', ReceiversListController);

  ReceiversListController.$inject = ['ReceiversService'];

  function ReceiversListController(ReceiversService) {
    var vm = this;

    vm.receivers = ReceiversService.query();
  }
}());
