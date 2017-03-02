(function () {
  'use strict';

  angular.module('core')
    .directive('contenteditable', contenteditable);

  function contenteditable() {
    var directive = {
      restrict: "A",
      require: "ngModel",
      link: link
    };

    return directive;

    function link(scope, element, attrs, ngModel) {

      console.log('pass');
      function read() {
        console.log(element.html());
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  }
}());