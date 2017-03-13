(function () {
  'use strict';

  angular
    .module('core')
    .service('shuffleService', shuffleService);

  function shuffleService() {

    this.array = function(arr) {
      var j, x, i;
      for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
      }
    }

  }
}());
