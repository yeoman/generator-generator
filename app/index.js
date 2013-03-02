'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var extractGeneratorName = function (_, appname) {
  var slugged = _.slugify(appname),
    match = slugged.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return slugged;
};


function GeneratorGenerator() {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname,
                                                        '../package.json')));
  this.currentYear = (new Date()).getFullYear();

  this.on('end', function () {
    console.log('\nI\'m all done. Just run ' +
                'npm install'.bold.yellow +
                ' to install the required dependencies.');
  });
}

util.inherits(GeneratorGenerator, yeoman.generators.NamedBase);

GeneratorGenerator.prototype.askFor = function askFor() {
  var done = this.async();
  var generatorName = extractGeneratorName(this._, this.appname);

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
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    'default': 'someuser'
  }, {
    name: 'generatorName',
    message: 'What\'s the base name of your generator?',
    'default': generatorName
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.githubUser = props.githubUser;
    this.generatorName = props.generatorName;
    done();
  }.bind(this));
};

GeneratorGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('editorconfig', '.editorconfig');
  this.template('jshintrc', '.jshintrc');
  this.template('README.md');
  this.template('LICENSE');
};

GeneratorGenerator.prototype.gitfiles = function gitfiles() {
  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
};

GeneratorGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.template('app/index.js');

  this.copy('editorconfig', 'app/templates/editorconfig');
  this.copy('jshintrc', 'app/templates/jshintrc');
  this.copy('app/_component.json', 'app/templates/_component.json');
};

GeneratorGenerator.prototype.tests = function tests() {
  this.mkdir('test');
  this.template('test-load.js', 'test/test-load.js');
  this.template('test-creation.js', 'test/test-creation.js');
};

module.exports = GeneratorGenerator;
