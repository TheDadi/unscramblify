(function () {
  'use strict';

  angular
    .module('app')
    .service('userService', userService);

  /**
   * Service to access/modify user data
   */

  /** @ngInject */
  function userService($q, firebaseAuthService, firebase, $firebaseArray) {

    var service = {
      createUser: createUser,
      createAnonymUser: createAnonymUser,
      setUser: setUser,
      getUser: getUser
    };

    return service;

    /**
     * Creates a User with the given credentials and adds the userdata to the users lists
     * @param credentials
     * @param userdata
     * @returns {*}
       */
    function createUser(credentials, userdata) {

      return firebaseAuthService.instance
        .$createUser(credentials)
        .then(
          function (auth) {
            return setUser(auth.uid, userdata);
          }
        );
    }

    function createAnonymUser(userdata){

      return firebaseAuthService.instance
        .$authAnonymously()
        .then(
          function (auth) {
            return setUser(auth.uid, userdata);
          }
        );
    }

    /**
     * Sets the userdata in the users list with the given uid
     * @param uid
     * @param user
     * @returns {*}
       */
    function setUser(uid, user) {

      var deferred = $q.defer();

      firebase
        .reference('/users/' + uid)
        .set(user, function (error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('success');
          }
        });

      return deferred.promise;
    }

    /**
     * Gets the user in the users list with the given uid
     * @param uid
     * @param user
     * @returns {*}
     */
    function getUser(uid) {

      return $firebaseArray(firebase
        .resource('/users'))
        .$loaded(
          function (users) {
            return users.$getRecord(uid);
          }
        );
    }

  }
})();
