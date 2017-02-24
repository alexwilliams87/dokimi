(function () {
  'use strict';

  angular
    .module('themes.admin')
    .controller('ThemesAdminController', ThemesAdminController);

  ThemesAdminController.$inject = ['$scope', '$state', '$window', 'themeResolve', 'Authentication', 'Notification', '$timeout', 'DomainsService'];

  function ThemesAdminController($scope, $state, $window, theme, Authentication, Notification, $timeout, DomainsService) {
    var vm = this;

    vm.theme = theme;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.progress = 0;
    vm.domains = DomainsService.query();

    // Remove existing Theme
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.theme.$remove(function() {
          $state.go('admin.themes.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Theme deleted successfully!' });
        });
      }
    }

    // Save Theme
    function save(isValid) {
      if (!isValid) {
        return false;
      }

      vm.theme.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);
    }


      // Create a new theme, or update the current instance
      // vm.theme.createOrUpdate()
      //   .then(successCallback)
      //   .catch(errorCallback);

    function successCallback(res) {
      $state.go('admin.themes.list'); // should we send the User to the list or the updated Theme's view?
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Theme saved successfully!' });
    }

    function errorCallback(res) {
      Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Theme save error!' });
    }
  }
}());
