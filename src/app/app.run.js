(function () {
  'use strict';

  angular
    .module('app')
    .run(runConfig);

  /** @ngInject */
  function runConfig($state, $rootScope) {

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the start page
      event.preventDefault();
      if (error === "AUTH_REQUIRED") {
        $state.go("start");
      }
    });

  }
})();
