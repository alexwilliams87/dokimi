(function () {
  'use strict';

  angular.module('core')
    .directive('contenteditable', contenteditable);

  function contenteditable() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      function read() {
        ngModel.$setViewValue(element.text().trim());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || '');
      };

      element.bind('blur keyup change', function() {
        scope.$apply(read);
      });
    }
  }
}());
