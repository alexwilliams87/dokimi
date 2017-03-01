(function () {
  'use strict';

  angular
    .module('questions.services')
    .factory('QuestionsService', QuestionsService);

  QuestionsService.$inject = ['$resource', '$log'];

  function QuestionsService($resource, $log) {
    var Question = $resource('/api/questions/:questionId', {
      questionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Question.prototype, {
      createOrUpdate: function () {
        var question = this;
        return createOrUpdate(question);
      }
    });

    return Question;

    function createOrUpdate(question) {
      if (question._id) {
        return question.$update(onSuccess, onError);
      } else {
        return question.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(question) {
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
