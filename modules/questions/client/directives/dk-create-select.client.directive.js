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
    .directive('dkCreateSelect', dkCreateSelect);

  function dkCreateSelect() {
    var directive = {
      restrict: 'E',
      scope: {
        io:     '=',
        type:   '@',
        locked: '='
      },
      templateUrl: '/modules/questions/client/directives/templates/dk-create-select.client.directive.template.html',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      scope.add = function() {
        if (!scope.locked) scope.io.push({value: '', checked: false});
      }

      scope.toggle = function(currentIndex) {
        if (scope.type === 'radio') {
          scope.io.forEach(function(option, index) {
            if (currentIndex != index) {
              scope.io[index].checked = false;
            }
          });
        }

        scope.io[currentIndex].checked = !scope.io[currentIndex].checked;
      }

      scope.delete = function(index) {
        if (!scope.locked) scope.io.splice(index, 1);
      }
    }
  }
}());
