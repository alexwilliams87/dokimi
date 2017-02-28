(function () {
  'use strict';

  angular
    .module('domains.admin')
    .controller('DomainsAdminController', DomainsAdminController);

  DomainsAdminController.$inject = ['$scope', '$state', '$window', 'domainResolve', 'Authentication', 'Notification', '$timeout'];

  function DomainsAdminController($scope, $state, $window, domain, Authentication, Notification, $timeout) {
    var vm = this;

    vm.domain = domain;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;

    // Remove existing Domain
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.domain.$remove(function() {
          $state.go('admin.domains.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Domain deleted successfully!' });
        });
      }
    }

    // Save Domain
    function save(isValid) {
      if (!isValid) {
        return false;
      }
      vm.domain.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }


      // Create a new domain, or update the current instance
      // vm.domain.createOrUpdate()
      //   .then(successCallback)
      //   .catch(errorCallback);

    function successCallback(res) {
      $state.go('admin.domains.list'); // should we send the User to the list or the updated Domain's view?
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Domain saved successfully!' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Domain save error!' });
    }
  }
}());
