/**
 * <dk-select>
 * <dk-select type="radio" question="" answer=""></dk-select>
 *
 * Permets de générer un select (radio ou checkbox)
 *
 * @param {String} type par defauts la selection est multiple (checkbox)
 *     `radio` => pour une selection à un seul élément (radio)
 * @param {Boolean} locked l'ajout et la suppresion d'options est vérouillée
 * @param {Array<Object>=} options le contenu de la question
 * @param {Array<Object>=} results le contenu de la reponse
 *
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkSelect', dkSelect);

  function dkSelect() {
    var directive = {
      restrict: 'E',
      scope: {
        options:  '=',
        results:  '=',
        type:     '@'
      },
      templateUrl: '/modules/questions/client/directives/templates/dk-select/dk-select.client.directive.template.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      if (!scope.options) scope.options = [];
      if (!scope.results) scope.results = [];

      scope.options.forEach(function(option) {
        scope.results.push({ checked: false });
      });

      scope.toggle = function(currentIndex) {
        if (scope.type === 'radio') {
          scope.options.forEach(function(option, index) {
            if (currentIndex != index) {
              scope.results[index].checked = false;
            }
          });
        }

        scope.results[currentIndex].checked = !scope.results[currentIndex].checked;
      }

    }
  }
}());
