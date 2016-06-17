// @todo: cleanup code

(function () {
    'use strict';

    const Synaptic = require('synaptic');
    const Neuron = Synaptic.Neuron;
    const Layer = Synaptic.Layer;
    const Network = Synaptic.Network;
    const Trainer = Synaptic.Trainer;
    const Architect = Synaptic.Architect;

    var synaptic = angular.module('gcg.synaptic');

    function SynapticCtrl ($rootScope, $scope, $timeout, $mdToast) {
      $scope.filter = "blur";
      $scope.url = "/src/assets/images/flower_after.png";
      $scope.disableTrain = false;

      var perceptron = null;
      var index = 0;
      var color_data = null;
      var filtered_data = null;
      var original_data = null;
      var canvas = null;
      var context = null;
      var size = 200 * 200;
      var trial = 0;
      var px = null;

      canvas = canvas || document.getElementById('canvas-demo3');
      context = context || canvas.getContext('2d');

      var getData = function (imageObj) {
        canvas = canvas || document.getElementById('canvas-demo3');
        context = context || canvas.getContext('2d');
        context.drawImage(imageObj, 0, 0);
        var imageData = context.getImageData(0, 0, 200, 200);
        return imageData.data;
      }

      var train = $scope.train = function () {
        $scope.disableTrain = true;
        trial = 0;
        perceptron = new Architect.Perceptron(27,8,3);
        color_data = getData(document.getElementById('input'));
        filtered_data = getData(document.getElementById('output'));
        original_data = getData(document.getElementById('original'));
        if (!$scope.trainingStarted) {
          $scope.trainingStarted = true;
          iteration();
        }

        $mdToast.showSimple('Training started');
      }

      var iteration = function () {
        trial++;

        for (index = 0; index < size; index += 2) {
          px = pixel(color_data, 0, 0);
          px = px.concat(pixel(color_data, -1, -1));
          px = px.concat(pixel(color_data, 0, -1));
          px = px.concat(pixel(color_data, 1, -1));
          px = px.concat(pixel(color_data, -1, 0));
          px = px.concat(pixel(color_data, 1, 0));
          px = px.concat(pixel(color_data, -1, 1));
          px = px.concat(pixel(color_data, 0, 1));
          px = px.concat(pixel(color_data, 1, 1));
          perceptron.activate(px);
          perceptron.propagate(.12, pixel(filtered_data,0,0));
        }
        preview();
      }

      var pixel = function (data, ox, oy) {
        var y = index / 200 | 0;
        var x = index % 200;

        if (ox && (x + ox) > 0 && (x + ox) < 200)
          x += ox;
        if (oy && (y + oy) > 0 && (y + oy) < 200)
          y += oy;

        var red = data[((200 * y) + x) * 4];
        var green = data[((200 * y) + x) * 4 + 1];
        var blue = data[((200 * y) + x) * 4 + 2];

        return [red / 255, green / 255, blue / 255];
      }

      var preview = function () {
        $scope.iterations = trial;
        
        var imageData = context.getImageData(0, 0, 200, 200);
        for (index = 0; index < size; index++) {
          var px = pixel(original_data, 0, 0);
          px = px.concat(pixel(original_data, -1, -1));
          px = px.concat(pixel(original_data, 0, -1));
          px = px.concat(pixel(original_data, 1, -1));
          px = px.concat(pixel(original_data, -1, 0));
          px = px.concat(pixel(original_data, 1, 0));
          px = px.concat(pixel(original_data, -1, 1));
          px = px.concat(pixel(original_data, 0, 1));
          px = px.concat(pixel(original_data, 1, 1));
          var rgb = perceptron.activate(px);
          imageData.data[index * 4] = (rgb[0] )* 255;
          imageData.data[index * 4 + 1] = (rgb[1] ) * 255;
          imageData.data[index * 4 + 2] = (rgb[2] ) * 255;
        }
        
        context.putImageData(imageData, 0, 0);
        
        $timeout(iteration, 100);
      }
    }

    synaptic.controller('SynapticCtrl', [
        '$rootScope',
        '$scope',
        '$timeout',
        '$mdToast',
        SynapticCtrl
    ]);
})();
