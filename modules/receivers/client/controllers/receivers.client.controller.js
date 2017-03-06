(function () {
  'use strict';

  angular
    .module('receivers')
    .controller('ReceiversController', ReceiversController);

  ReceiversController.$inject = ['$scope', 'receiverResolve', 'Authentication', 'CarsService', 'MarksService'];

  function ReceiversController($scope, receiver, Authentication, CarsService, MarksService) {
    var vm = this;

    vm.receiver = receiver;
    vm.authentication = Authentication;
    vm.cars = CarsService.query();
    vm.marks = MarksService.query();

  }
}());
