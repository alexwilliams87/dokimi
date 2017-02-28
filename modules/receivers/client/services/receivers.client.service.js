(function () {
  'use strict';

  angular
    .module('receivers.services')
    .factory('ReceiversService', ReceiversService);

  ReceiversService.$inject = ['$resource', '$log'];

  function ReceiversService($resource, $log) {
    var Receiver = $resource('/api/receivers/:receiverId', {
      receiverId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Receiver.prototype, {
      createOrUpdate: function () {
        var receiver = this;
        return createOrUpdate(receiver);
      }
    });

    return Receiver;

    function createOrUpdate(receiver) {
      if (receiver._id) {
        return receiver.$update(onSuccess, onError);
      } else {
        return receiver.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(receiver) {
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
