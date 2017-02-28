/**
 * <dk-create-ranking></dk-create-ranking>
 * <dk-create-ranking io="vm.resmiss"></dk-create-ranking>
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
    .directive('dkCreateRanking', dkCreateRanking);

  dkCreateRanking.$inject = ['$document'];

  function dkCreateRanking(document) {
    var directive = {
      restrict: 'E',
      scope: {
        io: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-create-ranking.client.directive.template.html',
    };

    return directive;

    function link(scope, element, attrs) {
      scope.lists = [
        {
          label: 'Valeur x',
          allowedTypes: ['x'],
          items: [
            {value: 'Bob', type: 'x', media: 'text'},
            {value: 'Charlie', type: 'x', media: 'text'},
            {value: 'Dave', type: 'x', media: 'text'}
          ]
        },
        {
          label: 'Valeur y',
          allowedTypes: ['y'],
          items: [
            {value: 'Alice', type: 'y', media: 'text'},
            {value: 'Eve', type: 'y', media: 'text'},
            {value: 'Peggy', type: 'y', media: 'text'}
          ]
        }
      ];

      scope.switchText = function(item) {
        item.value = null;
        item.media = 'text';
      }

      scope.switchImage = function(item) {
        item.media = 'image';
      }
    }
  }
}());
