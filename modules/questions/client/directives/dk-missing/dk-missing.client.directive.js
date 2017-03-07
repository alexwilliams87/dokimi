/**
 * <dk-create-missing></dk-create-missing>
 * <dk-create-missing string="" results=""></dk-create-missing>
 *
 * Permets de générer un texte à champs manquants
 *
 * @param {String=} string  l'objet généré qui définit le texte et ses champs
 * @param {Array=} results l'objet généré qui définit le texte et ses champs
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkMissing', dkMissing);

  dkMissing.$inject = ['$compile'];

  function dkMissing($compile) {
    var directive = {
      restrict: 'E',
      scope: {
        string:  '=',
        results: '='
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      scope.results = [];
      scope.strings = scope.string.split(/(%s)/);

      var count = 0;

      scope.strings.forEach(function(string) {
        if (string == '%s') {
          var el = $compile('<span class="content-editable" contenteditable ng-model="results[' + count + ']"></span>')(scope);
          element.append(el);
          count++;
        }
        else {
          element.append(string);
        }
      });
    }
  }
}());
