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
          userAuth: ['auth', function (auth) {
            return auth.instance.$requireAuth();
          }]
        }
      })
      .state('unauth', {
        abstract: true,
      });

    $urlRouterProvider.otherwise('/');
  }

})();
