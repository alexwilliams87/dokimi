/**
 * <dk-create-missing></dk-create-missing>
 * <dk-create-missing string="" results=""></dk-create-missing>
 *
 * Permets de générer un texte à champs manquants
 *
 * @param {Array=} options  l'objet généré qui définit le texte et ses champs
 * @param {Array=} results l'objet généré qui définit le texte et ses champs
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkSelect', dkSelect);

  function dkSelect() {
    var directive = {
      restrict: 'E',
      scope: {
        options: '=',
        results: '='
      },
      link: link
    };

    return directive;

    function link(scope, element, attrs) {

    }
  }
}());
