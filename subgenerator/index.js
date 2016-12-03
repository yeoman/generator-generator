'use strict';
var path = require('path');
var Generator = require('yeoman-generator');
var superb = require('superb');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Generator namespace'
    });
  }

  writing() {
    var generatorName = this.fs.readJSON(this.destinationPath('package.json')).name;

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('generators', this.options.namespace, 'index.js')),
      {
        // Escape apostrophes from superb to not conflict with JS strings
        superb: superb().replace('\'', '\\\''),
        generatorName: generatorName
      }
    );

    this.fs.copy(
      this.templatePath('templates/**'),
      this.destinationPath(path.join('generators', this.options.namespace, 'templates'))
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/' + this.options.namespace + '.js'),
      {
        namespace: this.options.namespace,
        generatorName: generatorName
      }
    );
  }
};
