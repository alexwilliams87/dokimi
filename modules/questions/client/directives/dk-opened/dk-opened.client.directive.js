/**
 * <dk-opened></dk-opened>
 * <dk-opened results=""></dk-opened>
 *
 * Permets de générer un texte
 *
 * @param {Array=} results l'objet généré qui définit le texte
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkOpened', dkOpened);

  function dkOpened() {
    var directive = {
      restrict: 'E',
      scope: {
        results: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-opened/dk-opened.client.directive.template.html',
    };

    return directive;

    function link(scope, element, attrs) {
      scope.results = scope.results || [];

      scope.$on('eventSaveData', function(event, data) {
        scope.$emit('readyToSave');
      });

    }
  }
}());
