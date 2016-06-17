AI Imagery with Node.js
==================
**Note: work in progress**

This project showcases different methods used to generate imagery based on AI from third party projects.
Everything is run through electron, giving the frontend access to node.js modules.
Currently the following AI methods are demonstrated:

- Applying filters with **Synaptic**
- Learning art styles with **Neural Style**

## Requirements
- Linux
- [Node.js](https://nodejs.org) >= 5.0.0
- [NPM](https://www.npmjs.com/)
- [Bower](http://bower.io/)
- [Neural Style](https://github.com/jcjohnson/neural-style)

## Installation
Clone from GitHub

    git clone https://github.com/moesjarraf/image-morpher-node.git

Install dependencies using

    npm install
    bower install

Install Neural Style according to the installation guide:

    https://github.com/jcjohnson/neural-style/blob/master/INSTALL.md

Create a shortcut for the installed neural-style folder at:

    /src/neural-style

The project can then be run with

    npm start

## Performance
Neural Style requires a [GPU with CUDA cores](https://gist.github.com/cavinsmith/ed92fee35d44ef91e09eaa8775e3284e) for better performance.
While installing Neural Style with GPU support you may want to install [OpenCL Torch](https://github.com/hughperkins/distro-cl) if it turns out installing `clnn` just isn´t working.
Also to install CUDA on Ubuntu 16.04 you can use `apt-get install nvidia-cuda-toolkit`.
