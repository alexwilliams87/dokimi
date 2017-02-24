(function () {
  'use strict';

  angular
    .module('themes')
    .controller('ThemesController', ThemesController);

  ThemesController.$inject = ['$scope', 'themeResolve', 'Authentication'];

  function ThemesController($scope, theme, Authentication) {
    var vm = this;

    vm.theme = theme;
    vm.authentication = Authentication;

  }
}());
