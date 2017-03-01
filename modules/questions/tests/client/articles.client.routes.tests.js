(function () {
  'use strict';

  describe('Questions Route Tests', function () {
    // Initialize global variables
    var $scope,
      QuestionsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _QuestionsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      QuestionsService = _QuestionsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('questions');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/questions');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('questions.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/questions/client/views/list-questions.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          QuestionsController,
          mockQuestion;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('questions.view');
          $templateCache.put('/modules/questions/client/views/view-question.client.view.html', '');

          // create mock question
          mockQuestion = new QuestionsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Question about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          QuestionsController = $controller('QuestionsController as vm', {
            $scope: $scope,
            questionResolve: mockQuestion
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:questionId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.questionResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            questionId: 1
          })).toEqual('/questions/1');
        }));

        it('should attach an question to the controller scope', function () {
          expect($scope.vm.question._id).toBe(mockQuestion._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/questions/client/views/view-question.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/questions/client/views/list-questions.client.view.html', '');

          $state.go('questions.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('questions/');
          $rootScope.$digest();

          expect($location.path()).toBe('/questions');
          expect($state.current.templateUrl).toBe('/modules/questions/client/views/list-questions.client.view.html');
        }));
      });
    });
  });
}());
