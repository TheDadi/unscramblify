(function () {
  'use strict';

  angular
    .module('app')
    .factory('firebaseAuth', firebaseAuth);

  /** @ngInject */
    function firebaseAuth($firebaseAuth, firebase) {

    var instance = $firebaseAuth(firebase.reference());

    var service = {
      instance: instance
    };

    return service;
  }
})();
