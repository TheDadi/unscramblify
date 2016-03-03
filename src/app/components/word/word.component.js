(function () {
  'use strict';

  angular
    .module('app')
    .component('word', {
      bindings: {
        shuffledWord: '=',
        wordToGuess: '=',
        wordSolved: '&?',
        nextWord: '&?'
      },
      controller: WordController,
      controllerAs: 'vm',
      templateUrl: 'app/components/word/word.html'
    });

  /** @ngInject */
  function WordController(wordScoreService) {
    var vm = this;
    vm.onKeyDown = onKeyDown;

    vm.onChange = onChange;

    var deleteClicked = 0;

    vm.guess = '';

    function onKeyDown(event) {

      if (event.which === 8 || event.which === 46) {
        deleteClicked++;
      }
    }

    function onChange() {

      if (vm.guess.toUpperCase() === vm.wordToGuess.toUpperCase()) {

        vm.wordSolved({score: wordScoreService.calculateScore(vm.wordToGuess, deleteClicked)});
        vm.guess = '';
        deleteClicked = 0;
      }
    }


  }


})();
