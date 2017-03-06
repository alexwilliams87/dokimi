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
    .directive('dkCreateMissing', dkCreateMissing);

  function dkCreateMissing() {
    var directive = {
      restrict: 'E',
      scope: {
        string:  '=',
        results: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-create-missing.client.directive.template.html',
    };

    return directive;

    function split(source) {
      var str = '',
          values = [],
          i = 0;

      str = source.replace(/<\?([\s\S]*?)\?>/g, function(str, p1) {
        values[i++] = p1;
        return '%s';
      });

      return {
        string: str,
        values: values
      };
    }

    function unsplit(str, values) {
      var i = 0;

      return str.replace(/%s/g, function(str, p1) {
        return '<?' + values[i++] + '?>';
      });
    }

    function link(scope, element, attrs) {
      if (scope.string && scope.results) scope.textContent = unsplit(scope.string, scope.results);

      if (!scope.string) scope.string = '';
      if (!scope.results) scope.results = [];

      scope.textarea = element[0].querySelector('.dk-create-missing-content textarea');

      scope.$watchCollection('textContent', function(text) {
        if (text) {
          var splited = split(text);
          scope.string = splited.string;
          scope.results = splited.values;
        }
      });

      scope.insert = function(open, close) {
        var tag = open + close;

        scope.textarea.focus();
        var cursorPosition = scope.textarea.selectionStart;
        scope.textContent = scope.textarea.value;

        scope.textarea.value = scope.textContent = scope.textContent.slice(0, cursorPosition) + tag + scope.textContent.slice(cursorPosition);
        scope.textarea.setSelectionRange(cursorPosition + open.length, cursorPosition + open.length);
      }
    }
  }
}());
