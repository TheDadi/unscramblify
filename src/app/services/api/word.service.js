(function () {
  'use strict';

  angular
    .module('app')
    .service('wordService', wordService);

  /**
   * Service to access/modify words
   */

  /** @ngInject */
  function wordService(firebase, $firebaseArray) {

    var service = {
      getWords: getWords,
    };

    return service;


    /**
     * Gets a list of words
     * @returns {*|a}
     */
    function getWords() {

      return $firebaseArray(firebase
        .reference('/words'));
    }

  }
})();
