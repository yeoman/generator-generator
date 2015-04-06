'use strict';
var path = require('path');
var url = require('url');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var npmName = require('npm-name');
var superb = require('superb');
var _ = require('lodash');
var _s = require('underscore.string');

/* jshint -W106 */
var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy ||
  process.env.HTTPS_PROXY || null;
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

if (process.env.GITHUB_TOKEN) {
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });
}

var extractGeneratorName = function (appname) {
  var match = appname.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return appname;
};

var emptyGithubRes = {
  name: '',
  email: '',
  html_url: ''
};

var githubUserInfo = function (name, cb, log) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
      res = emptyGithubRes;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var GeneratorGenerator = module.exports = generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.currentYear = (new Date()).getFullYear();
  },

  prompting: {
    askFor: function () {
      var done = this.async();

      this.log(yosay('Create your own ' + chalk.red('Yeoman') + ' generator with superpowers!'));

      var prompts = [{
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: 'someuser'
      }];

      this.prompt(prompts, function (props) {
        this.githubUser = props.githubUser;

        done();
      }.bind(this));
    },

    askForGeneratorName: function () {
      var done = this.async();
      var generatorName = extractGeneratorName(this.appname);
      var prompts = [{
        name: 'generatorName',
        message: 'What\'s the base name of your generator?',
        default: generatorName
      }, {
        type: 'confirm',
        name: 'askNameAgain',
        message: 'The name above already exists on npm, choose another?',
        default: true,
        when: function (answers) {
          var done = this.async();
          var name = 'generator-' + answers.generatorName;
          npmName(name, function (err, available) {
            if (!available) {
              done(true);
            }

            done(false);
          });
        }
      }];

      this.prompt(prompts, function (props) {
        if (props.askNameAgain) {
          return this.prompting.askForGeneratorName.call(this);
        }

        this.generatorName = props.generatorName;
        this.appname = _s.slugify('generator-' + this.generatorName);

        done();
      }.bind(this));
    }
  },

  configuring: {
    enforceFolderName: function () {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }
      this.config.save();
    },

    userInfo: function () {
      var done = this.async();

      githubUserInfo(this.githubUser, function (res) {
        /*jshint camelcase:false */
        this.realname = res.name;
        this.email = res.email;
        this.githubUrl = res.html_url;
        done();
      }.bind(this), this.log);
    }
  },

  writing: {
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
      this.fs.copyTpl(
        this.templatePath('app/index.js'),
        this.destinationPath('app/index.js'),
        {
          superb: superb(),
          generatorName: _s.classify(this.generatorName)
        }
      );
    },

    templates: function () {
      this.copy('editorconfig', 'app/templates/editorconfig');
      this.copy('jshintrc', 'app/templates/jshintrc');
      this.copy('app/templates/_package.json', 'app/templates/_package.json');
      this.copy('app/templates/_bower.json', 'app/templates/_bower.json');
    },

    tests: function () {
      this.template('test-app.js', 'test/test-app.js');
    }
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
