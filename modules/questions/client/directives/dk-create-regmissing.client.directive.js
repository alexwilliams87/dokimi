/**
 * <dk-create-regmissing></dk-create-regmissing>
 * <dk-create-regmissing io="vm.resmiss"></dk-create-regmissing>
 *
 * Permets de générer un texte à champs manquants
 *
 * @param {Object=} io l'objet généré qui définit le texte et ses champs
 *     resmiss = {
 *       content: 'Quel est son nom ? %s',
 *       values: ['/Julien|Sophie/i']
 *     };
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateRegmissing', dkCreateRegmissing);

  function dkCreateRegmissing() {
    var directive = {
      restrict: 'E',
      scope: {
        io: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-create-missing.client.directive.template.html',
    };

    return directive;

    RegExp.escape= function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    function compile(source, build) {
      var i = 0;

      var simplified = source.replace(/<\?([\s\S]*?)\?>/g, function(str, p1) {

        try {
          var rg = new RegExp(p1, 'i');
        } catch(e) {
          console.log(e);
          return e;
        }

        build.values[i] = rg;
        i++;

        return '%s';
      });

      build.content = simplified;
    }

    function link(scope, element, attrs) {
      if (!scope.io) {
        scope.io = {
          content: null,
          values:  []
        };
      }

      scope.textarea = element[0].querySelector('.dk-create-missing-content textarea');

      scope.$watchCollection('content', function(content) {
        if (content) compile(content, scope.io);
      });

      scope.add = function(open, close) {
        var tag = open + close;

        scope.textarea.focus();
        var cursorPosition = scope.textarea.selectionStart;
        scope.content = scope.textarea.value;

        scope.textarea.value = scope.content = scope.content.slice(0, cursorPosition) + tag + scope.content.slice(cursorPosition);
        scope.textarea.setSelectionRange(cursorPosition + open.length, cursorPosition + open.length);
      }
    }
  }
}());
