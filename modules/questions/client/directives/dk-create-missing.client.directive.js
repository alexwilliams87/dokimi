/**
 * <dk-create-missing></dk-create-missing>
 * <dk-create-missing io="vm.resmiss"></dk-create-missing>
 *
 * Permets de générer un texte à champs manquants
 *
 * @param {Object=} io l'objet généré qui définit le texte et ses champs
 *     resmiss = {
 *       content: 'Quel est son nom ? %s',
 *       values: ['Julien']
 *     };
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateMissing', dkCreateMissing);

  function dkCreateMissing() {
    var directive = {
      restrict: 'E',
      scope: {
        io: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-create-missing.client.directive.template.html',
    };

    return directive;

    function compile(source, build) {
      build.values = [];
      var i = 0;

      var simplified = source.replace(/<\?([\s\S]*?)\?>/g, function(str, p1) {
        build.values[i] = p1;
        i++;

        return '%s';
      });

      build.content = simplified;
    }

    function link(scope, element, attrs) {
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
