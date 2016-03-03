(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/landing',
        parent: 'auth',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'vm',
        resolve: {
          loggedInUser: ['userAuth', 'userService', function (userAuth, userService) {
            return userService.getUser(userAuth.uid).$loaded();
          }]
        }
      });
  }

})();
