(function () {
    `use strict`;

    const neuralStyle = angular.module(`gcg.neuralStyle`);
    const path = require(`path`);
    const NeuralStyle = require(path.join(process.cwd(), `/src/libs/neural-style`));

    function NeuralStyleCtrl ($rootScope, $scope, $mdToast) {
        $scope.NeuralStyle = {
            iterations: 0,
            output: null,
            inputContent: null,
            inputStyle: null,

            start: function () {
                let ns = new NeuralStyle({
                    neural_style_folder: path.join(process.cwd(), `/src/neural-style`),
                    style_image: path.join(process.cwd(), `/src/neural-style/examples/inputs/art_style.jpg`),
                    content_image: path.join(process.cwd(), `/src/neural-style/examples/inputs/canyon.jpg`),
                    output_image: path.join(process.cwd(), `/temp/output.png`)
                });

                $scope.NeuralStyle.options = ns.options;
                $scope.NeuralStyle.inputContent = ns.options.content_image.replace(process.cwd(), ``);
                $scope.NeuralStyle.inputStyle = ns.options.style_image.replace(process.cwd(), ``);

                ns.start((response, iterations, image) => {
                    $scope.NeuralStyle.iterations = iterations;
                    if (image) $scope.NeuralStyle.output = image.replace(process.cwd(), ``);
                    $scope.$apply();
                });

                $scope.NeuralStyle.started = true;
            }
        };
    }

    neuralStyle.controller(`NeuralStyleCtrl`, [
        `$rootScope`,
        `$scope`,
        `$mdToast`,
        NeuralStyleCtrl
    ]);
})();
