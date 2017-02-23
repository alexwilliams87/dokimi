(function () {
  'use strict';

  describe('Forms Route Tests', function () {
    // Initialize global variables
    var $scope,
      FormsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _FormsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      FormsService = _FormsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('forms');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/forms');
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
          liststate = $state.get('forms.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/forms/client/views/list-forms.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          FormsController,
          mockForm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('forms.view');
          $templateCache.put('/modules/forms/client/views/view-form.client.view.html', '');

          // create mock form
          mockForm = new FormsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Form about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          FormsController = $controller('FormsController as vm', {
            $scope: $scope,
            formResolve: mockForm
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:formId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.formResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            formId: 1
          })).toEqual('/forms/1');
        }));

        it('should attach an form to the controller scope', function () {
          expect($scope.vm.form._id).toBe(mockForm._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/forms/client/views/view-form.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/forms/client/views/list-forms.client.view.html', '');

          $state.go('forms.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('forms/');
          $rootScope.$digest();

          expect($location.path()).toBe('/forms');
          expect($state.current.templateUrl).toBe('/modules/forms/client/views/list-forms.client.view.html');
        }));
      });
    });
  });
}());
