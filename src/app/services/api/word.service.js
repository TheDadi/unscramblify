(function () {
  'use strict';

  angular
    .module('app')
    .service('userService', userService);

  /**
   * Service to access/modify words
   */

  /** @ngInject */
  function userService(firebase, $firebaseArray) {

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
        .resource('/words'))
        .$loaded(
          function (users) {
            return users.$getRecord(uid);
          }
        );
    }

  }
})();
