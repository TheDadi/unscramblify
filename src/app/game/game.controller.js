(function () {
  'use strict';

  angular
    .module('app')
    .controller('GameController', GameController);

  /** @ngInject */
  function GameController(words, loggedInUser, $state, wordShuffleService) {
    var vm = this;

    vm.onTimeOver = onTimeOver;
    vm.getNextWord = getNextWord;


    vm.shuffledWordList = wordShuffleService.shuffleArray(words);

    vm.words = words;
    vm.user = loggedInUser;
    vm.gameDuration = 40;

    function onTimeOver() {
      $state.go('scoreboard');
    }

    function getNextWord() {

    }

  }
})();
