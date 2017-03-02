(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;
    vm.splitText = splitText;

    vm.result = splitText();

    vm.text;

    function splitText() {
	    var text = "text part 1 %s text part 2";
	    var res = text.split("%s");
	    var result = [];
	    for (var i = 0; i < res.length-1; i++) {
	    	result.push(res[i]);
	    	result.push('%s');
	    }
	    result.push(res[res.length-1]);
	    return result;
	}
  }
}());
