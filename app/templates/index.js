'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

function GeneratorGenerator() {
  yeoman.generators.Base.apply(this, arguments);

  this.mainFile = this.readFileAsString(path.join(this.sourceRoot(),
                                                  'main.js'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname,
                                                        '../package.json')));

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' +
                'npm install'.bold.yellow +
                ' to install the required dependencies.');
  });
}

util.inherits(GeneratorGenerator, yeoman.generators.NamedBase);

GeneratorGenerator.prototype.projectfiles = function projectfiles() {
  this.template('Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('jshintrc', '.jshintrc');
};

GeneratorGenerator.prototype.gitfiles = function gitfiles() {
  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
};

GeneratorGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.write('app/main.js', this.mainFile);
};

module.exports = GeneratorGenerator;

