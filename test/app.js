'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var mockery = require('mockery');
var Promise = require('pinkie-promise');

describe('generator:app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    mockery.registerMock('npm-name', function () {
      return Promise.resolve(true);
    });
  });

  after(function () {
    mockery.disable();
  });

  describe('defaults', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../app'))
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
        .toPromise();
    });

    it('created and CD into a folder named like the generator', function () {
      assert.equal(path.basename(process.cwd()), 'generator-temp');
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
          'yeoman-generator': '^1.0.0',
          chalk: '^1.1.3',
          yosay: '^1.2.1'
        },
        devDependencies: {
          'yeoman-test': '^1.6.0',
          'yeoman-assert': '^2.2.1'
        },
        keywords: ['yeoman-generator']
      });
    });

    it('fills the README with project data', function () {
      assert.fileContent('README.md', '# generator-temp');
      assert.fileContent('README.md', 'npm install -g yo');
      assert.fileContent('README.md', 'npm install -g generator-temp');
      assert.fileContent('README.md', 'yo temp');
      assert.fileContent('README.md', 'yeoman/generator-temp');
    });
  });
});
