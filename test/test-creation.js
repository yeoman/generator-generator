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
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      ['package.json', /"name": "temp"/],
      '.gitignore',
      '.gitattributes',
      '.jshintrc',
      '.travis.yml',
      'app/index.js'
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
