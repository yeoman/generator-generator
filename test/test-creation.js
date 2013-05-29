/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
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
      '.travis.yml',
      'app/index.js',
      'app/templates/_package.json',
      'app/templates/_bower.json',
    ];

    helpers.mockPrompt(this.app, {
      'githubUser': 'passy',
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
