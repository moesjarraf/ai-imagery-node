// @todo: add docs
const path = require(`path`);

class NeuralStyle {
    constructor (cwd, options) {
        if (!cwd) throw new TypeError(`No cwd was given`);
        if (!options) throw new TypeError(`No options were given`);
        if (!options.style_image) throw new TypeError(`No style_image was given`);
        if (!options.content_image) throw new TypeError(`No content_image was given`);
        if (!options.output_image) throw new TypeError(`No output_image was given`);

        // default conficuration
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
        options.original_colors = `1`;

        this.cwd = cwd;
        this.options = options;
    }

    start (callback) {
        let iterations = 0;
        let spawn = require(`child_process`).spawn;
        let options = [`neural_style.lua`];

        for (let option in this.options) {
            options.push(`-${option}`);
            options.push(this.options[option]);
        }

        let child = spawn(`th`, options, { cwd: this.cwd });

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
            console.log(`Child process errored with message: ${response}`);
        });

        child.on(`close`, (code) => {
            console.log(`Child process exited with code: ${code}`);
        });

        return child;
    }
}

module.exports = NeuralStyle;
