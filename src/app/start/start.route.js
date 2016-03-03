(function () {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('start', {
        url: '/start',
        parent: 'unauth',
        templateUrl: 'app/start/start.html',
        controller: 'StartController',
        controllerAs: 'vm'
      });
  }

})();
