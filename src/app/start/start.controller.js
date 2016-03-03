(function () {
  'use strict';

  angular
    .module('app')
    .controller('StartController', StartController);

  /** @ngInject */
  function StartController($state, userService, generateRandomService) {
    var vm = this;

    vm.user = {};

    vm.login = login;

    vm.setAvatar = setAvatar;

    vm.avatars = generateRandomService.generateRandomArray(12);

    vm.user.avatar = vm.avatars[0];

    function login(user) {

      userService.createAnonymUser(user)
        .then(
          function (success) {
            $state.go('landing');
          },
          function (error) {
            //TODO: Erorhandling
            console.log(error);
          }
        );
    }

    function setAvatar(avatarId){

      vm.user.avatar = avatarId;
    }
  }
})();
