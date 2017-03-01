(function () {
  'use strict';

  angular
    .module('questions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('questions', {
        abstract: true,
        url: '/questions',
        template: '<ui-view/>'
      })
      .state('questions.view', {
        url: '/:questionId',
        templateUrl: '/modules/questions/client/views/view-question.client.view.html',
        controller: 'QuestionsController',
        controllerAs: 'vm',
        resolve: {
          questionResolve: getQuestion
        },
        data: {
          pageTitle: 'Question {{ questionResolve.title }}'
        }
      });
  }

  getQuestion.$inject = ['$stateParams', 'QuestionsService'];

  function getQuestion($stateParams, QuestionsService) {
    return QuestionsService.get({
      questionId: $stateParams.questionId
    }).$promise;
  }
}());
