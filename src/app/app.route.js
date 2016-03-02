(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        abstract: true,
        resolve: {
          userAuth: ['firebaseAuthService', function (firebaseAuthService) {
            return firebaseAuthService.instance.$requireAuth();
          }]
        }
      })
      .state('unauth', {
        abstract: true,
      });

    $urlRouterProvider.otherwise('/start');
  }

})();
