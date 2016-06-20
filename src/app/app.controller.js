(function () {
  'use strict';

  var app = angular.module('gcg.app');

  function AppCtrl ($rootScope, $scope) {
    $rootScope.app = $rootScope.app || {};

    angular.extend($rootScope.app, {
      title: 'AI Imagery techniques in Node.js',
      language: 'en-US',
    });
  }

  app.controller('AppCtrl', [
    '$rootScope',
    '$scope',
    AppCtrl
  ]);
})();
