(function () {
  'use strict';

  angular
    .module('forms.services')
    .factory('FormsService', FormsService);

  FormsService.$inject = ['$resource', '$log'];

  function FormsService($resource, $log) {
    var Form = $resource('/api/forms/:formId', {
      formId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Form.prototype, {
      createOrUpdate: function () {
        var form = this;
        return createOrUpdate(form);
      }
    });

    return Form;

    function createOrUpdate(form) {
      if (form._id) {
        return form.$update(onSuccess, onError);
      } else {
        return form.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(form) {
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
