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

    this.option('name', {
      type: String,
      required: true,
      description: 'Generator name'
    })
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

    app: function () {
      // TODO generate any generator. Not specific to gen:app
      this.fs.copyTpl(
        this.templatePath('app/index.js'),
        this.destinationPath('generators/app/index.js'),
        {
          superb: superb(),
          generatorName: _.capitalize(_.camelCase(this.options.name))
        }
      );

      this.fs.copy(
        this.templatePath('app/templates/**'),
        this.destinationPath('generators/app/templates')
      );

      var pkg = this.fs.readJSON(this.destinationPath('package.json'));
      extend(pkg, {
        files: ['generators'],
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
    },

    tests: function () {
      this.fs.copyTpl(
        this.templatePath('test-app.js'),
        this.destinationPath('test/app.js'),
        {
          generatorName: this.options.name
        }
      );
    }
  }
});
