/**
 * <dk-create-select>
 * <dk-create-select type="radio" select="vm.select"></dk-create-select>
 *
 * Permets de générer un select (radio ou checkbox)
 *
 * @param {String} type par defauts la selection est multiple (checkbox)
 *     `radio` => pour une selection à un seul élément (radio)
 * @param {Boolean} locked l'ajout et la suppresion d'options est vérouillée
 * @param {Array<Object>=} io l'objet qui définit le select
 *     select = [
 *       {
 *         value: 'Option 1',
 *         checked:  true || false,
 *         readonly: true || false !optional
 *       }
 *     ];
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateBoolean', dkCreateBoolean);

  function dkCreateBoolean() {
    var directive = {
      restrict: 'E',
      scope: {
        io: '='
      },
      templateUrl: '/modules/questions/client/directives/templates/dk-create-boolean.client.directive.template.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      if (!scope.io) {
        scope.io = [
          {
            assign:   true,
            value:   'Vrai',
            checked:  true,
            readonly: true
          },
          {
            assign:   false,
            value:   'Faux',
            checked:  false,
            readonly: true
          },
        ];
      }
    }

  }
}());
