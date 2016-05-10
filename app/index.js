'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var askName = require('inquirer-npm-name');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

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
    return askName({
      name: 'name',
      message: 'Your generator name',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: function (str) {
        return str.length > 0;
      }
    }, this).then(function (props) {
      this.props.name = props.name;
    }.bind(this));
  },

  default: function () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }

    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

    this.composeWith('node:app', {
      options: {
        babel: false,
        boilerplate: false,
        name: this.props.name,
        projectRoot: 'generators',
        skipInstall: this.options.skipInstall,
        readme: readmeTpl({
          generatorName: this.props.name,
          yoName: this.props.name.replace('generator-', '')
        })
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

  writing: function () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    extend(pkg, {
      dependencies: {
        'yeoman-generator': '^0.23.0',
        chalk: '^1.0.0',
        yosay: '^1.0.0'
      },
      devDependencies: {
        'yeoman-test': '^1.0.0',
        'yeoman-assert': '^2.0.0'
      }
    });
    pkg.keywords = pkg.keywords || [];
    pkg.keywords.push('yeoman-generator');

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
