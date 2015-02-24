'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('generator:app', function () {
  before(function (done) {
    mockery.enable({warnOnUnregistered: false});
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

    helpers.run(path.join(__dirname, '../app'))
      .withOptions({'skip-install': true})
      .withPrompts({
        githubUser: 'imp',
        generatorName: 'temp',
        pkgName: false
      })
      .on('end', done);
  });

  after(function () {
    mockery.disable();
  });

  it('creates files', function () {
    var expected = [
      '.yo-rc.json',
      '.gitignore',
      '.gitattributes',
      '.jshintrc',
      'app/index.js',
      'app/templates/_package.json',
      'app/templates/_bower.json',
    ];
    assert.file(expected);
  });

  it('fills package.json with correct information', function () {
    assert.fileContent('package.json',  /"name": "generator-temp"/);
  });

  it('setup travis.CI config', function () {
    assert.fileContent(
      '.travis.yml',
      /node_js/
    );
  });

  it('escapes possible apostrophes from superb in index.js', function () {
    assert.fileContent('app/index.js', /Welcome to the cat\\'s meow/);
  });
});
