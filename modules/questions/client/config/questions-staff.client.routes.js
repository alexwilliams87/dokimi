(function () {
  'use strict';

  angular
    .module('questions.staff.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('staff.questions', {
        abstract: true,
        url: '/questions',
        template: '<ui-view/>'
      })
      .state('staff.questions.list', {
        url: '',
        templateUrl: '/modules/questions/client/views/staff/list-questions.client.view.html',
        controller: 'QuestionsListController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Liste des questions'
        }
      })
      .state('staff.questions.create', {
        url: '/create',
        templateUrl: '/modules/questions/client/views/staff/create-question.client.view.html',
        controller: 'QuestionsStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Créer une question'
        },
        resolve: {
          questionResolve: newQuestion
        }
      })
      .state('staff.questions.edit', {
        url: '/:questionId/edit',
        templateUrl: '/modules/questions/client/views/staff/create-question.client.view.html',
        controller: 'QuestionsStaffController',
        controllerAs: 'vm',
        data: {
          roles: ['staff'],
          pageTitle: 'Editer une question'
        },
        resolve: {
          questionResolve: getQuestion
        }
      });
  }

  getQuestion.$inject = ['$stateParams', 'QuestionsService'];

  function getQuestion($stateParams, QuestionsService) {
    return QuestionsService.get({
      questionId: $stateParams.questionId
    }).$promise;
  }

  newQuestion.$inject = ['QuestionsService'];

  function newQuestion(QuestionsService) {
    return new QuestionsService();
  }

}());
