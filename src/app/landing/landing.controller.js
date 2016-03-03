(function () {
  'use strict';

  angular
    .module('app')
    .controller('LandingController', LandingController);

  /** @ngInject */
  function LandingController(loggedInUser, $state) {
    var vm = this;

    vm.user = loggedInUser;

    vm.startGame = startGame;

    function startGame() {
      $state.go('game');
    }

  }
})();
