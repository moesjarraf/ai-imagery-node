(function () {
  'use strict';

  var synaptic = angular.module('gcg.synaptic');

  function router ($stateProvider) {
    $stateProvider.state('synaptic', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {}
    });

    $stateProvider.state('synaptic.view', {
      url: '/synaptic',
      templateUrl: '/src/app/synaptic/synaptic.view.html',
      controller: 'SynapticCtrl',
      resolve: {}
    });
  }

  synaptic.config([
    '$stateProvider',
    router
  ]);
})();
