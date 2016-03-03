(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('game', {
        url: '/game',
        parent: 'auth',
        templateUrl: 'app/game/game.html',
        controller: 'GameController',
        controllerAs: 'vm',
        resolve: {
          words: ['userAuth', 'wordService', function (userAuth, wordService) {
            return wordService.getWords().$loaded();
          }],
          loggedInUser: ['userAuth', 'userService', function (userAuth, userService) {
            return userService.getUser(userAuth.uid).$loaded();
          }]
        }
      });
  }

})();
