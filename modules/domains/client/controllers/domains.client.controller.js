(function () {
  'use strict';

  angular
    .module('domains')
    .controller('DomainsController', DomainsController);

  DomainsController.$inject = ['$scope', 'domainResolve', 'Authentication'];

  function DomainsController($scope, domain, Authentication) {
    var vm = this;

    vm.domain = domain;
    vm.authentication = Authentication;

  }
}());
