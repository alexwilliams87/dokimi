(function () {
  'use strict';

  angular
  .module('domains.admin')
  .controller('DomainsAdminListController', DomainsAdminListController);

  DomainsAdminListController.$inject = ['DomainsService', '$window', 'Notification', '$mdDialog'];

  function DomainsAdminListController(DomainsService, $window, Notification, $mdDialog) {
    var vm 		= this;
    vm.remove 	= remove;
    vm.domains 	= DomainsService.query();

    function remove(domain, ev) {

      var confirm = $mdDialog.confirm()
          .title('Would you like to delete this domain ?')
          .textContent('You are going to delete a domain. Would you like to continue ?')
          .ariaLabel('Deleting a domain')
          .targetEvent(ev)
          .ok('Yes, I want to do it.')
          .cancel('I do not think so. Leave it alone.');

      $mdDialog.show(confirm).then(function() {
        vm.domains.splice(vm.domains.indexOf(domain), 1);
        domain.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Domain deleted successfully!' });
        });
      });
    }
  }
}());
