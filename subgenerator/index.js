'use strict';
var path = require('path');
var url = require('url');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var npmName = require('npm-name');
var superb = require('superb');
var _ = require('lodash');
var extend = require('deep-extend');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Generator namespace'
    });
  },

  writing: function () {
    var generatorName = this.fs.readJSON(this.destinationPath('package.json')).name;

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('generators', this.namespace, 'index.js')),
      {
        superb: superb(),
        generatorName: this.generatorName
      }
    );

    this.fs.copy(
      this.templatePath('templates/**'),
      this.destinationPath(path.join('generators', this.namespace, 'templates'))
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/' + this.namespace + '.js'),
      {
        namespace: this.namespace,
        generatorName: this.generatorName
      }
    );
  }
});
