'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var GitHubApi = require('github');
var github = new GitHubApi({
  version: '3.0.0'
});

var extractGeneratorName = function (_, appname) {
  var slugged = _.slugify(appname),
    match = slugged.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return slugged;
};

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

function GeneratorGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname,
                                                        '../package.json')));
  this.currentYear = (new Date()).getFullYear();

  this.on('end', function () {
    if (!options['skip-install']) {
      this.npmInstall();
    }
  });
}

util.inherits(GeneratorGenerator, yeoman.generators.Base);

GeneratorGenerator.prototype.askFor = function askFor() {
  var done = this.async();
  var generatorName = extractGeneratorName(this._, this.appname);

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    default: 'someuser'
  }, {
    name: 'generatorName',
    message: 'What\'s the base name of your generator?',
    default: generatorName
  }];

  this.prompt(prompts, function (props) {
    this.githubUser = props.githubUser;
    this.generatorName = props.generatorName;
    this.appname = 'generator-' + this.generatorName;
    done();
  }.bind(this));
};

GeneratorGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

GeneratorGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('editorconfig', '.editorconfig');
  this.template('jshintrc', '.jshintrc');
  this.template('travis.yml', '.travis.yml');
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
};

GeneratorGenerator.prototype.templates = function copyTemplates() {
  this.copy('editorconfig', 'app/templates/editorconfig');
  this.copy('jshintrc', 'app/templates/jshintrc');
  this.copy('travis.yml', 'app/templates/travis.yml');
  this.copy('app/templates/_package.json', 'app/templates/_package.json');
  this.copy('app/templates/_bower.json', 'app/templates/_bower.json');
};

GeneratorGenerator.prototype.tests = function tests() {
  this.mkdir('test');
  this.template('test-load.js', 'test/test-load.js');
  this.template('test-creation.js', 'test/test-creation.js');
};

module.exports = GeneratorGenerator;
