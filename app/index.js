'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var askName = require('inquirer-npm-name');
var _ = require('lodash');
var extend = require('deep-extend');

function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return name;
}

module.exports = generators.Base.extend({
  initializing: function () {
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
      this.props.name = name;
      done();
    }.bind(this));
  },

  defaults: function () {
    // TODO enforce folder name before starting the generation process

    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        name: this.props.name,
        projectRoot: 'generators',
        skipInstall: this.options.skipInstall
      }
    }, {
      local: require('generator-node').app
    });

    this.composeWith('generator:subgenerator', {
      arguments: ['app']
    }, {
      local: require.resolve('../subgenerator')
    });
  },

  writing: {
    _readme: function () {
      // TODO generate own readme
      // TODO move this to app generator
      this.fs.template(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        {

        }
      );
    },

    pkg: function () {
      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
      extend(pkg, {
        dependencies: {
          'yeoman-generator': '^0.20.2',
          chalk: '^1.0.0',
          yosay: '^1.0.2'
        },
        devDependencies: {
          'yeoman-assert': '^2.0.0'
        }
      });
      pkg.keywords = pkg.keywords || [];
      pkg.keywords.push('yeoman-generator');

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
