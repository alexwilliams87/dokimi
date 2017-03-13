(function () {
  'use strict';

  angular
    .module('core')
    .service('dateService', dateService);

  function dateService() {

    this.convert = function(date) {
      // 2017-03-08T08:44:02.973Z
      var dateTab = date.split('T');

      //Traitement de la date
      var dateUS = dateTab[0].split('-');
      var dateFR = dateUS[2] + '/' + dateUS[1] + '/' + dateUS[0];

      //Traitement de l'heure
      var time = dateTab[1].slice(0, 8);

      var finalDate = dateFR + ' ' + time;
      return finalDate;
    }

  }
}());
