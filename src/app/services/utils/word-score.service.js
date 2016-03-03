(function () {
  'use strict';

  angular
    .module('app')
    .factory('wordScoreService', wordScoreService);

  /** @ngInject */
  function wordScoreService() {

    var service = {
      calculateScore: calculateScore,
      calculateMaxScore: calculateMaxScore
    };

    return service;


    /**
     * Calculates the score for the given word and number of deletes clicked
     * @param word
     * @param numberOfDeletes
     * @returns (*)
     */
    function calculateScore(word, numberOfDeletes) {

      var _numberOfDeletes = numberOfDeletes || 0;

      var score = calculateMaxScore(word) - _numberOfDeletes;

      return score > 0 ? score : 0;
    }

    /**
     * Calculates the max_score for the given word
     * @param word
     * @returns (*)
     */
    function calculateMaxScore(word) {

      if (!word) {
        throw Error('No Word provided');
      }

      return Math.floor(Math.pow(1.95, (word.length / 3)));
    }

  }
})();
