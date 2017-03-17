/**
 * <dk-regmissing></dk-regmissing>
 * <dk-regmissing io="vm.resmiss"></dk-regmissing>
 *
 * Permets de générer un texte à champs manquants
 *
 * @param {Object=} string l'objet généré qui définit le texte et ses champs
 * @param {String=} results l'objet généré qui définit le texte et ses champs
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateRegmissing', dkCreateRegmissing);

  function dkCreateRegmissing() {
    var directive = {
      restrict: 'E',
      scope: {
        string:  '=',
        results: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-regmissing/dk-regmissing.client.directive.template.html',
    };

    return directive;

    RegExp.escape= function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    function split(source) {
      var str = '',
          values = [],
          i = 0;

      str = source.replace(/<\?([\s\S]*?)\?>/g, function(str, p1) {
        try {
          var rg = new RegExp(p1, 'i');
        } catch(e) {
          console.log(e);
          return e;
        }

        values[i++] = new String(rg);

        return '%s';
      });

      return {
        string: str,
        values: values
      };
    }

    function link(scope, element, attrs) {
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

        scope.textarea.value = scope.content = scope.textContent.slice(0, cursorPosition) + tag + scope.textContent.slice(cursorPosition);
        scope.textarea.setSelectionRange(cursorPosition + open.length, cursorPosition + open.length);
      }
    }
  }
}());
