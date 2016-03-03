(function () {
  'use strict';

  angular
    .module('app')
    .controller('GameController', GameController);

  /** @ngInject */
  function GameController(words, loggedInUser, $state, wordShuffleService, scoreboardService) {
    var vm = this;
    var wordIndex = 0;

    vm.onTimeOver = onTimeOver;
    vm.getNextWord = getNextWord;

    vm.shuffledWordList = wordShuffleService.shuffleArray(words);
    vm.currentWord = vm.shuffledWordList[wordIndex];
    vm.user = loggedInUser;
    vm.gameDuration = 40;

    function onTimeOver() {

      scoreboardService
        .addUser(vm.user.$id, {
          avatar: vm.user.avatar,
          firstname: vm.user.firstname,
          lastname: vm.user.lastname,
          score: vm.user.score
        })
        .then(function () {
          $state.go('leaderboard');
        })
        .catch(function (error) {

          //TODO: Errorhandling
        });
    }

    function getNextWord(score) {

      vm.user.score += score;
      vm.user.$save();
      wordIndex++;

      vm.currentWord = vm.shuffledWordList[wordIndex];
    }


  }
})();
