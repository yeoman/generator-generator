'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var <%= _.classify(generatorName) %>Generator = module.exports = function <%= _.classify(generatorName) %>Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(<%= _.classify(generatorName) %>Generator, yeoman.generators.Base);

<%= _.classify(generatorName) %>Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user
  console.log(this.yeoman);

  // replace it with a short and sweet description of your generator
  console.log(chalk.magenta('You\'re using the fantastic <%= _.classify(generatorName) %> generator.'));

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

<%= _.classify(generatorName) %>Generator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

<%= _.classify(generatorName) %>Generator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
