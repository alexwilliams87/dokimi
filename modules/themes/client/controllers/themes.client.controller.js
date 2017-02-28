(function () {
  'use strict';

  angular
    .module('themes')
    .controller('ThemesController', ThemesController);

  ThemesController.$inject = ['$scope', 'themeResolve', 'Authentication', 'DomainsService'];

  function ThemesController($scope, theme, Authentication, DomainsService) {
    var vm = this;

    vm.theme = theme;
    vm.authentication = Authentication;
    vm.domains = DomainsService.query();

  }
}());
