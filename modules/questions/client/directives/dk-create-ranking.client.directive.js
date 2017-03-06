/**
 * <dk-create-ranking></dk-create-ranking>
 * <dk-create-ranking io="vm.resmiss"></dk-create-ranking>
 *
 * Permets de générer un texte à champs manquants
 *
 * @param {Object=} lists l'objet généré qui définit le texte et ses champs
 * @param {Object=} results l'objet généré qui définit le texte et ses champs
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateRanking', dkCreateRanking);

  dkCreateRanking.$inject = ['$document'];

  function dkCreateRanking(document) {
    var directive = {
      restrict: 'E',
      scope: {
        lists:   '=',
        results: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-create-ranking.client.directive.template.html',
    };

    return directive;

    function link(scope, element, attrs) {
      if (!scope.results) scope.results = [];
      if (!scope.lists) {
        scope.lists = [
          { name: 'x', allowedTypes: ['x'], items: [] },
          { name: 'y', allowedTypes: ['y'], items: [] }
        ];
      }

      scope.filesItems = {};

      scope.switchText = function(item) {
        item.value = null;
        item.media = 'text';
      }

      scope.switchImage = function(item) {
        item.value = null;
        item.media = 'image';
      }

      scope.add = function(list) {
        list.items.push(
          {
            id: list.name + Date.now(),
            value: '',
            type: list.name,
            media: 'text'
          }
        );
      }

      scope.delete = function(list, item) {
        list.splice(list.indexOf(item), 1);
        if (scope.filesItems[item.id]) delete scope.filesItems[item.id];
      }
    }
  }
}());
