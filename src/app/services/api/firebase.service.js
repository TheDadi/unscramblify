(function () {
  'use strict';

  angular
    .module('app')
    .factory('firebase', firebase);

  /** @ngInject */
  function firebase(FIREBASE_URL) {

    var service = {
      reference: reference
    };

    return service;

    /**
     * Creates a firebase reference to the given resource
     * @param resource
     * @returns {Firebase}
       */
    function reference(resource) {

      if(resource){
        return new Firebase(FIREBASE_URL + resource)
      }

      return new Firebase(FIREBASE_URL);
    }

  }
})();
