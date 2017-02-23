// <dropdown  ng-if="item.type == 'dropdown'" mode="hover">
//   <md-button>{{ item.title }}</md-button>
//   <dropdown-content>
//     <a ng-repeat="subitem in item.items | orderBy: 'position'" ui-sref="{{subitem.state}}({{subitem.params}})" ng-bind="subitem.title"></a>
//   </dropdown-content>
// </dropdown>

(function () {
  'use strict';

  angular.module('core')
    .directive('dropdown', dropdown);

  dropdown.$inject = ['$document'];

  function dropdown($document) {
    var directive = {
      restrict: 'EA',
      transclude: true,
      template: '<div ng-transclude></div>',
      link: link
    };

    var _dropdowns = [];

    var register = function(currentEl) {
      _dropdowns.push(currentEl);
    };

    var unregister = function(currentEl) {
      var index;
      index = _dropdowns.indexOf(currentEl);
      if (index > -1) {
        _dropdowns.splice(index, 1);
      }
    };

    var toggleActive = function(currentEl) {
      angular.forEach(_dropdowns, function(el) {
        if (el !== currentEl) {
          el.removeClass('active');
        }
      });

      currentEl.toggleClass('active');
    };

    return directive;

    function link(scope, element, attrs) {
      var body = $document.find('body');

      register(element);

      if (attrs.mode === 'click') {
        body.bind('click', function() {
          console.log('bind');
          angular.forEach(_dropdowns, function(el) {
            el.removeClass('active');
          });
        });

        element.bind('click', function(event) {
          event.stopPropagation();
          toggleActive(element);
        });
      }
    }
  }
}());
