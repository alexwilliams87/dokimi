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
          mainstate = $state.get('admin.forms');
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
          liststate = $state.get('admin.forms.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/forms/client/views/admin/list-forms.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          FormsAdminController,
          mockForm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.forms.create');
          $templateCache.put('/modules/forms/client/views/admin/form-form.client.view.html', '');

          // Create mock form
          mockForm = new FormsService();

          // Initialize Controller
          FormsAdminController = $controller('FormsAdminController as vm', {
            $scope: $scope,
            formResolve: mockForm
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.formResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/forms/create');
        }));

        it('should attach an form to the controller scope', function () {
          expect($scope.vm.form._id).toBe(mockForm._id);
          expect($scope.vm.form._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/forms/client/views/admin/form-form.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          FormsAdminController,
          mockForm;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.forms.edit');
          $templateCache.put('/modules/forms/client/views/admin/form-form.client.view.html', '');

          // Create mock form
          mockForm = new FormsService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Form about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          FormsAdminController = $controller('FormsAdminController as vm', {
            $scope: $scope,
            formResolve: mockForm
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:formId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.formResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            formId: 1
          })).toEqual('/admin/forms/1/edit');
        }));

        it('should attach an form to the controller scope', function () {
          expect($scope.vm.form._id).toBe(mockForm._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/forms/client/views/admin/form-form.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
