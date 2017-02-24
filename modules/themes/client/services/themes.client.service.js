(function () {
  'use strict';

  angular
    .module('themes.services')
    .factory('ThemesService', ThemesService);

  ThemesService.$inject = ['$resource', '$log'];

  function ThemesService($resource, $log) {
    var Theme = $resource('/api/themes/:themeId', {
      themeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Theme.prototype, {
      createOrUpdate: function () {
        var theme = this;
        return createOrUpdate(theme);
      }
    });

    return Theme;

    function createOrUpdate(theme) {
      if (theme._id) {
        return theme.$update(onSuccess, onError);
      } else {
        return theme.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(theme) {
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
