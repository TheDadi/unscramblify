(function () {
  'use strict';

  angular
    .module('app')
    .factory('wordShuffleService', wordShuffleService);

  /** @ngInject */
  function wordShuffleService() {

    var service = {
      shuffle: shuffle,
      shuffleArray: shuffleArray
    };

    return service;


    /**
     * Shuffles the given word
     * @param word
     * @returns {*}
     */
    function shuffle(word) {

      return {
        word: word.$value,
        shuffledWordArray: _.shuffle(word.$value.toUpperCase().split(''))
      };

    }

    /**
     * Shuffles every word in the list
     * @param words
     * @returns Array
     */
    function shuffleArray(words) {
      return _.map(words, shuffle)
    }
  }
})();
