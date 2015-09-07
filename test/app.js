'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('generator:app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    mockery.registerMock('npm-name', function (name, fn) {
      fn(null, true);
    });
  });

  after(function () {
    mockery.disable();
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'generator-temp',
          description: 'A node generator',
          homepage: 'http://yeoman.io',
          githubAccount: 'yeoman',
          authorName: 'The Yeoman Team',
          authorEmail: 'hi@yeoman.io',
          authorUrl: 'http://yeoman.io',
          keywords: [],
          license: 'MIT'
        })
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        'README.md',
        'package.json',
        'generators/app/index.js',
        'generators/app/templates/dummyfile.txt',
        'test/app.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', function () {
      assert.JSONFileContent('package.json', {
        name: 'generator-temp',
        dependencies: {
          'yeoman-generator': '^0.20.2',
          chalk: '^1.0.0',
          yosay: '^1.0.2'
        },
        devDependencies: {
          'yeoman-assert': '^2.0.0'
        },
        keywords: ['yeoman-generator']
      });
    });

    it('fills the README with project data', function () {
      assert.fileContent('README.md', 'yo generator-temp');
      assert.fileContent('README.md', 'npm install -g generator-temp');
      assert.fileContent('README.md', '## License\n\nMIT');
      assert.fileContent('README.md', 'yeoman/generator-temp');
    });
  });
});
