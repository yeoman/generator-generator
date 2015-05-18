'use strict';
var path = require('path');
var url = require('url');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var askName = require('inquirer-npm-name');
var superb = require('superb');
var _ = require('lodash');

function makeGeneratorName(name) {
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return _.kebabCase(name);
}

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('flat', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'When specified, generators will be created at the top level of the project.'
    });

    this.props = {};
  },

  prompting: function () {
    var done = this.async();

    askName({
      name: 'name',
      message: 'Your generator name',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: function (str) {
        return str.length > 0;
      }
    }, this, function (name) {
      name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
      this.props.name = name;
      done()
    }.bind(this));
  },

  defaults: function () {
    // TODO enforce folder name before starting the generation process

    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        name: this.props.name
      }
    }, {
      local: require('generator-node').app
    });

    this.composeWith('generator:base', {
      options: {
        flat: this.options.flat,
        name: this.props.name
      }
    }, {
      local: require.resolve('../base')
    });
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
