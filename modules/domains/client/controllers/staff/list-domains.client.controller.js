(function () {
  'use strict';

  angular
  .module('domains.staff')
  .controller('DomainsStaffListController', DomainsStaffListController);

  DomainsStaffListController.$inject = ['DomainsService', '$window', 'Notification', '$mdDialog'];

  function DomainsStaffListController(DomainsService, $window, Notification, $mdDialog) {
    var vm = this;

    vm.domains = DomainsService.query();
  }
}());
