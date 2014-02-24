'use strict';
var path = require('path');
var url = require('url');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


/* jshint -W106 */
var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
/* jshint +W106 */
var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  var proxyUrl = url.parse(proxy);
  githubOptions.proxy = {
    host: proxyUrl.hostname,
    port: proxyUrl.port
  };
}

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var extractGeneratorName = function (_, appname) {
  var slugged = _.slugify(appname);
  var match = slugged.match(/^generator-(.+)/);

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

var GeneratorGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.currentYear = (new Date()).getFullYear();

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();
    var generatorName = extractGeneratorName(this._, this.appname);
    // have Yeoman greet the user
    this.log(this.yeoman);
    this.log(chalk.magenta('Create your own magical generator with superpowers!'));
  

    var prompts = [{
      name: 'githubUser',
      message: 'Would you mind telling me your username on GitHub?',
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
  },

  enforceFolderName: function () {
    if (this.appname !== this._.last(this.destinationRoot().split(path.sep))) {
      this.destinationRoot(this.appname);
    }
  },

  userInfo: function () {
    var done = this.async();

    githubUserInfo(this.githubUser, function (res) {
      /*jshint camelcase:false */
      this.realname = res.name;
      this.email = res.email;
      this.githubUrl = res.html_url;
      done();
    }.bind(this));
  },

  projectfiles: function () {
    this.template('_package.json', 'package.json');
    this.template('editorconfig', '.editorconfig');
    this.template('jshintrc', '.jshintrc');
    this.template('_travis.yml', '.travis.yml');
    this.template('README.md');
  },

  gitfiles: function () {
    this.copy('gitattributes', '.gitattributes');
    this.copy('gitignore', '.gitignore');
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/templates');
    this.template('app/index.js');
  },

  templates: function () {
    this.copy('editorconfig', 'app/templates/editorconfig');
    this.copy('jshintrc', 'app/templates/jshintrc');
    this.copy('app/templates/_package.json', 'app/templates/_package.json');
    this.copy('app/templates/_bower.json', 'app/templates/_bower.json');
  },

  tests: function () {
    this.mkdir('test');
    this.template('test-load.js', 'test/test-load.js');
    this.template('test-creation.js', 'test/test-creation.js');
  }
});

module.exports = GeneratorGenerator;
