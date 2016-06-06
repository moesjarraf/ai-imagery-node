(function () {
  'use strict';

  var app = angular.module('gcg.app');

  function router ($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('blender');
  }

  app.config([
    '$urlRouterProvider',
    '$locationProvider',
    router
  ]);
})();
