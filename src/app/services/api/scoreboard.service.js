(function () {
  'use strict';

  angular
    .module('app')
    .service('scoreboardService', scoreboardService);


  /** @ngInject */
  function scoreboardService(firebase, $firebaseArray, $q) {

    var service = {
      getScoreboard: getScoreboard,
      addUser: addUser
    };

    return service;

    /**
     * Gets the scoreboard
     * @returns {*|a}
     */
    function getScoreboard() {

      return $firebaseArray(firebase
        .reference('/scoreboard').orderByChild('score').limitToLast(100));
    }

    /**
     * Adds the user to the scoreboard
     * @param user
     * @returns {*}
       */

    function addUser(uid, user) {

      var deferred = $q.defer();

      firebase
        .reference('/scoreboard').child(uid)
        .set(user, function (error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('success');
          }
        });

      return deferred.promise;
    }

  }
})();
