(function () {
    `use strict`;

    const neuralStyle = angular.module(`gcg.neuralStyle`);
    const path = require(`path`);
    const NeuralStyle = require(path.join(process.cwd(), `/src/libs/neural-style`));

    function NeuralStyleCtrl ($rootScope, $scope, $mdToast, $timeout) {
        let nsProcess = null;
        let ns = new NeuralStyle(path.join(process.cwd(), `/src/neural-style`), {
            style_image: path.join(process.cwd(), `/src/assets/images/picasso.jpg`),
            content_image: path.join(process.cwd(), `/src/assets/images/canyon.jpg`),
            output_image: path.join(process.cwd(), `/temp/output.png`)
        });

        $scope.NeuralStyle = {
            options: ns.options,
            optionsStringified: JSON.stringify(ns.options, null, 4),
            iterations: 0,
            output: null,
            inputContent: null,
            inputStyle: null,

            start: function () {
                nsProcess = ns.start((response, iterations, image) => {
                    $scope.NeuralStyle.iterations = iterations;
                    if (image) $scope.NeuralStyle.output = image.replace(process.cwd(), ``);
                    $scope.$apply();
                });

                $scope.NeuralStyle.started = true;
            },

            stop: function () {
                $scope.NeuralStyle.started = false;
                nsProcess.kill(`SIGINT`);
            }
        };

        $scope.$watch('NeuralStyle.optionsStringified', (value) => {
            ns.options = JSON.parse(value);
            $scope.NeuralStyle.options = ns.options;
            $scope.NeuralStyle.inputContent = ns.options.content_image.replace(process.cwd(), ``);
            $scope.NeuralStyle.inputStyle = ns.options.style_image.replace(process.cwd(), ``);
            $timeout(() => { resizeInputContent(); }, 1);
        });

        $scope.$on('$destroy', () => {
           $scope.NeuralStyle.stop();
        });

        function resizeInputContent () {
            let inputContent = angular.element(`#inputContent`);
            $scope.NeuralStyle.inputContentHeight = inputContent[0].offsetHeight;
        }
    }

    neuralStyle.controller(`NeuralStyleCtrl`, [
        `$rootScope`,
        `$scope`,
        `$mdToast`,
        `$timeout`,
        NeuralStyleCtrl
    ]);
})();
