(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('leaderboard', {
        url: '/leaderboard',
        parent: 'auth',
        templateUrl: 'app/leaderboard/leaderboard.html',
        controller: 'LeaderboardController',
        controllerAs: 'vm',
        resolve: {
          loggedInUser: ['userAuth', 'userService', function (userAuth, userService) {
            return userService.getUser(userAuth.uid).$loaded();
          }],
          scoreboard: ['scoreboardService', function (scoreboardService) {
            return scoreboardService.getScoreboard().$loaded();
          }]
        }
      });
  }

})();
