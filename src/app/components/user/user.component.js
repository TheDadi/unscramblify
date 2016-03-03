(function () {
  'use strict';

  angular
    .module('app')
    .component('user', {
      bindings: {
        user: '='
      },
      controller: UserController,
      controllerAs: 'vm',
      templateUrl: 'app/components/user/user.html'
    });

  /** @ngInject */
  function UserController() {
    var vm = this;

  }


})();
