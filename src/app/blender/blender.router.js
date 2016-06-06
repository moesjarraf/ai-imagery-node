(function () {
  'use strict';

  var blender = angular.module('gcg.blender');

  function router ($stateProvider) {
    $stateProvider.state('blender', {
      abstract: true,
      template: '<div ui-view></div>',
      resolve: {}
    });

    $stateProvider.state('blender.view', {
      url: '/blender',
      templateUrl: '/src/app/blender/blender.view.html',
      controller: 'BlenderCtrl',
      resolve: {}
    });
  }

  blender.config([
    '$stateProvider',
    router
  ]);
})();
