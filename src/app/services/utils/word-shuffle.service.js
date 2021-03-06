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
        shuffledWord: _.shuffle(word.$value.toUpperCase().split('')).join('')
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
