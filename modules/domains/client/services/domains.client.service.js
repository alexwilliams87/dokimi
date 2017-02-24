(function () {
  'use strict';

  angular
    .module('domains.services')
    .factory('DomainsService', DomainsService);

  DomainsService.$inject = ['$resource', '$log'];

  function DomainsService($resource, $log) {
    var Domain = $resource('/api/domains/:domainId', {
      domainId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Domain.prototype, {
      createOrUpdate: function () {
        var domain = this;
        return createOrUpdate(domain);
      }
    });

    return Domain;

    function createOrUpdate(domain) {
      if (domain._id) {
        return domain.$update(onSuccess, onError);
      } else {
        return domain.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(domain) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
