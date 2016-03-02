(function () {
  'use strict';

  angular
    .module('app')
    .factory('firebaseAuthService', firebaseAuthService);

  /** @ngInject */
    function firebaseAuthService($firebaseAuth, firebase) {

    var instance = $firebaseAuth(firebase.reference());

    var service = {
      instance: instance
    };

    return service;
  }
})();
