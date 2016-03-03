(function () {
  'use strict';

  angular
    .module('app')
    .controller('LeaderboardController', LeaderboardController);

  /** @ngInject */
  function LeaderboardController(loggedInUser, scoreboard, $state) {
    var vm = this;

    vm.user = loggedInUser;

    vm.scoreboard = _.reverse(scoreboard);


  }
})();
