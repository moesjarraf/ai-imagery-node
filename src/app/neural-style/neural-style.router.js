(function () {
  'use strict';

  var neuralStyle = angular.module('gcg.neuralStyle');

  function router ($stateProvider) {
    $stateProvider.state('neuralStyle', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {}
    });

    $stateProvider.state('neuralStyle.view', {
      url: '/neural-style',
      templateUrl: '/src/app/neural-style/neural-style.view.html',
      controller: 'NeuralStyleCtrl',
      resolve: {}
    });
  }

  neuralStyle.config([
    '$stateProvider',
    router
  ]);
})();
