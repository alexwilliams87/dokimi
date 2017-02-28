(function () {
  'use strict';

  angular
    .module('themes')
    .controller('ThemesListController', ThemesListController);

  ThemesListController.$inject = ['ThemesService', 'DomainsService'];

  function ThemesListController(ThemesService, DomainsService) {
    var vm = this;

    vm.themes = ThemesService.query();
    vm.domains = DomainsService.query();
  }
}());
