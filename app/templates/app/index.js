'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


module.exports = <%= _.capitalize(generatorName) %>Generator;

function <%= _.capitalize(generatorName) %>Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' + 'npm install && bower install'.bold.yellow + ' to install the required dependencies.');
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
}

util.inherits(<%= _.capitalize(generatorName) %>Generator, yeoman.generators.NamedBase);

<%= _.capitalize(generatorName) %>Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: 'Y/n',
    warning: 'Yes: Enabling this will be totally awesome!'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    this.compassBootstrap = (/y/i).test(props.compassBootstrap);

    cb();
  }.bind(this));
};

<%= _.capitalize(generatorName) %>Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

<%= _.capitalize(generatorName) %>Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
  this.template('_component.json', 'component.json');
};

<%= _.capitalize(generatorName) %>Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

<%= _.capitalize(generatorName) %>Generator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_component.json', 'component.json');
};

<%= _.capitalize(generatorName) %>Generator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

<%= _.capitalize(generatorName) %>Generator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

<%= _.capitalize(generatorName) %>Generator.prototype.app = function app() {
  this.mkdir('app');
};
