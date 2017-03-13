/**
 * <dk-create-ranking></dk-create-ranking>
 * <dk-create-ranking lists="" results=""></dk-create-ranking>
 *
 * Permets de générer une question de classement
 *
 * @param {Object=} lists l'objet généré qui définit le texte et ses champs
 * @param {Object=} results l'objet généré qui définit le texte et ses champs
 */

(function () {
  'use strict';

  angular.module('questions')
    .directive('dkCreateRanking', dkCreateRanking);

  dkCreateRanking.$inject = ['$q', 'Upload', 'shuffleService'];

  function dkCreateRanking($q, Upload, shuffle) {
    var directive = {
      restrict: 'E',
      scope: {
        lists:   '=',
        results: '='
      },
      link: link,
      templateUrl: '/modules/questions/client/directives/templates/dk-ranking/dk-create-ranking.client.directive.template.html',
    };

    return directive;

    // changer scope.lists par scope.results et éviter les copies multiples
    function link(scope, element, attrs) {
      scope.filesItems = {};
      scope.lists = scope.lists || [
        { name: 'x', allowedTypes: ['x'], items: [] },
        { name: 'y', allowedTypes: ['y'], items: [] }
      ];
      scope.results = scope.results || [];

      if (scope.results.length > 0) {
        angular.copy(scope.results, scope.lists);
      }

      scope.switchText = function(item) {
        item.value = null;
        item.media = 'text';
      }

      scope.switchImage = function(item, ref) {
        item.value = ref;
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

      scope.$on('eventSaveData', function(event, data) {
        var defer = $q.defer();
        var promises = [];

        if (scope.filesItems) {
          angular.forEach(scope.filesItems, function(item) {
            promises.push(
              upload({ newImage: item.file }).then(function(path) {
                item.file = path;
              }));
          });

          $q.all(promises).then(lastTask);
        }

        function lastTask() {
          if (scope.form.$valid && (scope.lists[0].items.length === scope.lists[1].items.length)) {
            var shuffled = [];

            angular.copy(scope.lists, scope.results);
            angular.copy(scope.lists, shuffled);

            shuffle.array(shuffled[0].items);
            shuffle.array(shuffled[1].items);

            angular.copy(shuffled, scope.lists);
          }

          scope.$emit('readyToSave');
          defer.resolve();
        }
      });
    }

    function upload(data) {
      return new Promise(function(resolve, reject) {
        Upload.upload({
          url: '/api/questions/upload/image',
          data: data
        }).then(function(response) {
          resolve(response.data);
        });
      });
    }

  }
}());
