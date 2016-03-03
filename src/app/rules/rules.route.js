(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('rules', {
        url: '/rules',
        parent: 'auth',
        templateUrl: 'app/rules/rules.html',
        controller: 'RulesController',
        controllerAs: 'vm',
        resolve: {
          loggedInUser: ['userAuth', 'userService', function (userAuth, userService) {
            return userService.getUser(userAuth.uid).$loaded();
          }]
        }
      });
  }

})();
