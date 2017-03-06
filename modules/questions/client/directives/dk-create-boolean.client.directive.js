/**
 * <dk-create-boolean>
 * <dk-create-boolean type="radio" select="vm.select"></dk-create-boolean>
 *
 * Permets de générer un select (radio ou checkbox)
 *
 * @param {Array<Object>=} options
 * @param {Array<Object>=} results
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateBoolean', dkCreateBoolean);

  function dkCreateBoolean() {
    var directive = {
      restrict: 'E',
      scope: {
        options: '=',
        results: '='
      },
      templateUrl: '/modules/questions/client/directives/templates/dk-create-boolean.client.directive.template.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

      if (!scope.options) {
        scope.options = [
          { assign: true,  value: 'Vrai', readonly: true },
          { assign: false, value: 'Faux', readonly: true }
        ];
      }

      if (!scope.results) {
        scope.results = [
          { checked: true },
          { checked: false }
        ];
      }
    }

  }
}());
