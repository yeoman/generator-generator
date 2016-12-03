'use strict';
var path = require('path');
var Generator = require('yeoman-generator');
var superb = require('superb');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.log('arguments', arguments);
    this.log('args', args);
    this.log('opts', opts);
    this.log(' this.options.name', this.options.name);

    this.option('name', {
      type: String,
      required: true,
      desc: 'Generator name'
    });
  }

  writing() {
    var generatorName = this.fs.readJSON(this.destinationPath('package.json')).name;

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('generators', this.options.name, 'index.js')),
      {
        // Escape apostrophes from superb to not conflict with JS strings
        superb: superb().replace('\'', '\\\''),
        generatorName: generatorName
      }
    );

    this.fs.copy(
      this.templatePath('templates/**'),
      this.destinationPath(path.join('generators', this.options.name, 'templates'))
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/' + this.options.name + '.js'),
      {
        name: this.options.name,
        generatorName: generatorName
      }
    );
  }
};
