/**
 * <dk-ranking></dk-ranking>
 * <dk-ranking lists="" results=""></dk-ranking>
 *
 * Permets de générer une réponse à une question de classement
 *
 * @param {Object=} lists l'objet généré qui définit le texte et ses champs
 * @param {Object=} results l'objet généré qui définit le texte et ses champs
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkRanking', dkRanking);

  function dkRanking() {
    var directive = {
      restrict: 'E',
      scope: {
        lists:   '=',
        results: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-ranking/dk-ranking.client.directive.template.html',
    };

    return directive;

    function link(scope, element, attrs) {
      if (scope.results && scope.results.length > 0) {
        angular.copy(scope.results, scope.lists);
      }

      scope.results = scope.lists;
    }

  }
}());
