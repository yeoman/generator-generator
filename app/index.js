'use strict';
var path = require('path');
var Generator = require('yeoman-generator');
var askName = require('inquirer-npm-name');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');

function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('generator-') === 0 ? name : 'generator-' + name;
  return name;
}

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    return askName({
      name: 'name',
      message: 'Your generator name',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: function (str) {
        return str.length > 'generator-'.length;
      }
    }, this).then(function (props) {
      this.props.name = props.name;
    }.bind(this));
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }

    var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

    this.composeWith(require.resolve('generator-node/generators/app'), {
      babel: false,
      boilerplate: false,
      name: this.props.name,
      projectRoot: 'generators',
      skipInstall: this.options.skipInstall,
      readme: readmeTpl({
        generatorName: this.props.name,
        yoName: this.props.name.replace('generator-', '')
      })
    });

    this.composeWith(require.resolve('../subgenerator'), {
      name: 'app'
    });
  }

  writing() {
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
  }

  install() {
    this.installDependencies({bower: false});
  }
};
