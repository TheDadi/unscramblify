(function () {
  'use strict';

  angular
    .module('app')
    .component('countdown', {
      bindings: {
        duration: '=?',
        start: '&?',
        finish: '&?'
      },
      controller: CountdownController,
      controllerAs: 'vm',
      templateUrl: 'app/components/countdown/countdown.html'
    });

  /** @ngInject */
  function CountdownController($interval) {
    var vm = this;

    vm.seconds = vm.duration || 10;
    var timer = $interval(function(){
      if(vm.seconds == 0){
        $interval.cancel(timer);
        vm.finish();
      }
      vm.seconds --;
    }, 1000)
  }


})();
