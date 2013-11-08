/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('Generator generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('generator:app', [
        '../../app'
      ]);
      this.app.options['skip-install'] = true;
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      ['package.json', /"name": "generator-temp"/],
      '.gitignore',
      '.gitattributes',
      '.jshintrc',
      ['.travis.yml', /if \[ "\$currentfolder" != 'generator-temp' \]; then cd .. \&\& eval "mv \$currentfolder generator-temp" && cd generator-temp; fi/],
      'app/index.js',
      'app/templates/_package.json',
      'app/templates/_bower.json',
    ];

    // Patch the user info to not run into rate limits on travis
    this.app.userInfo = function () {
      this.realname = 'Tyrion Lannister';
      this.email = 'imp@casterlyrock.com';
      this.githubUrl = 'https://github.com/imp';
    };

    helpers.mockPrompt(this.app, {
      'githubUser': 'imp',
      'generatorName': 'temp'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});

describe('Subgenerator subgenerator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('generator:subgenerator', [
        '../../subgenerator'
      ], ['foo']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'foo/index.js',
      'foo/templates/somefile.js',
    ];

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
