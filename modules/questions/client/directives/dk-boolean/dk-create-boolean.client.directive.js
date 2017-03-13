/**
 * <dk-boolean>
 * <dk-boolean type="radio" select="vm.select"></dk-boolean>
 *
 * Permets de générer un select boolean (simplement un clone de select)
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
      templateUrl: '/modules/questions/client/directives/templates/dk-boolean/dk-create-boolean.client.directive.template.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

      scope.options = scope.options || [
        { assign: true,  value: 'Vrai', readonly: true },
        { assign: false, value: 'Faux', readonly: true }
      ];

      scope.results = scope.results || [
        { checked: true },
        { checked: false }
      ];

    }
  }
}());
