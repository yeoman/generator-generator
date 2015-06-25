'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('generator:app --coffeescript', function () {
  before(function () {
    mockery.enable({warnOnUnregistered: false});
    mockery.deregisterMock('github');
    mockery.deregisterMock('superb');
    mockery.deregisterMock('npm-name');
    mockery.registerMock('github', function () {
      return {
        user: {
          getFrom: function (data, cb) {
            cb(null, JSON.stringify({
              name: 'Tyrion Lannister',
              email: 'imp@casterlyrock.com',
              html_url: 'https://github.com/imp'
            }));
          }
        }
      };
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    mockery.registerMock('npm-name', function (name, fn) {
      fn(null, true);
    });
  });

  after(function () {
    mockery.deregisterMock('github');
    mockery.deregisterMock('superb');
    mockery.deregisterMock('npm-name');
    mockery.disable();
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          coffee: true
        })
        .withPrompts({
          githubUser: 'imp',
          generatorName: 'temp',
          pkgName: false
        })
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        '.yo-rc.json',
        '.gitignore',
        '.gitattributes',
        '.jshintrc',
        'generators/app/index.js',
        'generators/app/index.coffee',
        'generators/app/templates/_package.json',
        'generators/app/templates/_bower.json',
        'generators/app/templates/jshintrc',
        'generators/app/templates/editorconfig'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', function () {
      assert.fileContent('package.json',  /"name": "generator-temp"/);
    });

    it('update package.json file array', function () {
      var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      assert.equal(pkg.files[0], 'generators');
    });

    it('setup travis.CI config', function () {
      assert.fileContent(
        '.travis.yml',
        /node_js/
      );
    });

    it('escapes possible apostrophes from superb in index.js', function () {
      assert.fileContent('generators/app/index.coffee', /Welcome to the cat\\'s meow/);
    });
  });

  describe('--flat', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withOptions({
          coffee: true,
          flat: true
        })
        .withPrompts({
          githubUser: 'imp',
          generatorName: 'temp',
          pkgName: false
        })
        .on('end', done);
    });

    it('creates flat files structure', function () {
      assert.file([
        'app/index.js',
        'app/index.coffee',
        'app/templates/_package.json',
        'app/templates/_bower.json',
        'app/templates/jshintrc',
        'app/templates/editorconfig'
      ]);
    });

    it('update package.json file array', function () {
      var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      assert.equal(pkg.files[0], 'app');
    });
  });
});
