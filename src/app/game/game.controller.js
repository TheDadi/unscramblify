(function () {
  'use strict';

  angular
    .module('app')
    .controller('GameController', GameController);

  /** @ngInject */
  function GameController(words, loggedInUser, $state) {
    var vm = this;

    vm.words = words;
    vm.user = loggedInUser;
    vm.gameDuration = 40;

    vm.onTimeOver = onTimeOver;

    function onTimeOver() {
      $state.go('scoreboard');
    }

  }
})();
