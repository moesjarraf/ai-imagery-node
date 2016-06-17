// @todo: add docs
const path = require(`path`);

class NeuralStyle {
    constructor (options) {
        if (!options) throw new TypeError(`No options were given`);
        if (!options.neural_style_folder) throw new TypeError(`No neural_style_folder was given`);
        if (!options.style_image) throw new TypeError(`No style_image was given`);
        if (!options.content_image) throw new TypeError(`No content_image was given`);
        if (!options.output_image) throw new TypeError(`No output_image was given`);

        options.model_file = `models/nin_imagenet_conv.caffemodel`;
        options.proto_file = `models/train_val.prototxt`;
        options.backend = `clnn`;
        options.num_iterations = `1000`;
        options.seed = `123`;
        options.content_layers = `relu0,relu3,relu7,relu12`;
        options.style_layers = `relu0,relu3,relu7,relu12`;
        options.content_weight = `10`;
        options.style_weight = `1000`;
        options.image_size = `500`;
        options.optimizer = `adam`;
        options.gpu = `0`;
        options.print_iter = `1`;
        options.save_iter = `10`;
        options.init = `image`;

        this.options = options;
    }

    start (callback) {
        let iterations = 0;
        let spawn = require(`child_process`).spawn;
        let child = spawn(`th`,
        [
            `neural_style.lua`,
            `-style_image`, this.options.style_image,
            `-content_image`, this.options.content_image,
            `-output_image`, this.options.output_image,
            `-model_file`, this.options.model_file,
            `-proto_file`, this.options.proto_file,
            `-backend`, this.options.backend,
            `-num_iterations`, this.options.num_iterations,
            `-seed`, this.options.seed,
            `-content_layers`, this.options.content_layers,
            `-style_layers`, this.options.style_layers,
            `-content_weight`, this.options.content_weight,
            `-style_weight`, this.options.style_weight,
            `-image_size`, this.options.image_size,
            `-optimizer`, this.options.optimizer,
            `-gpu`, this.options.gpu,
            `-print_iter`, this.options.print_iter,
            `-save_iter`, this.options.save_iter,
            `-init`, this.options.init
        ],
        {
            cwd: this.options.neural_style_folder
        });

        child.stdout.on(`data`, (chunk) => {
            let response = chunk.toString();

            if (response.indexOf(`Iteration`) > -1) {
                let image = null;

                if (iterations && iterations % this.options.save_iter === 0) {
                    let extension = path.extname(this.options.output_image);
                    image = this.options.output_image.replace(extension, ``);
                    image += `_${iterations}${extension}`;
                }

                callback(response, iterations, image);
                iterations++;
            }
        });

        child.stderr.on(`data`, (chunk) => {
            let response = chunk.toString();
            console.log(`Child proces errored with message: ${response}`);
        });

        child.on(`close`, (code) => {
            console.log(`Child process exited with code: ${code}`);
        });
    }
}

module.exports = NeuralStyle;
