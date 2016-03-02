(function () {
  'use strict';

  angular
    .module('app')
    .factory('generateRandomService', generateRandomService);

  /** @ngInject */
  function generateRandomService() {

    var service = {
      generateRandomArray: generateRandomArray,
      generateRandomNumber: generateRandomNumber
    };

    return service;


    /**
     * Creates an array with random numbers
     * @param length
     * @returns {Array}
       */
    function generateRandomArray(length) {

      var randomArray = [];

      for (var i = 0; i <= length; i++) {
          randomArray.push(generateRandomNumber());
      }

      return randomArray;
    }


    /**
     * Creates a random number
     * @returns {*|number}
       */
    function generateRandomNumber() {

      return _.random(100);
    }

  }
})();
