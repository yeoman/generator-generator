'use strict';

var inception = require('../inception');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

var assert = require('yeoman-generator').assert;

describe('generator-generator inception tests', function () {
  var sampleGenerator;

  this.timeout(100000);

  describe('with an existing user on Github', function () {
    before(function() {
      return inception.prepare({}, {
        githubUser: 'jonathanong',
        generatorName: 'unitTest'
      }).then(function(generator) {
        sampleGenerator = generator;
      });
    });

    it('should creates files', function () {
      return inception.run(sampleGenerator).then(function () {
        var expected = [
          'app/src/configuring.js',
          'app/src/end.js',
          'app/src/initializing.js',
          'app/src/install.js',
          'app/src/prompting.js',
          'app/src/writing.js',
          'app/templates/_package.json',
          'app/templates/_README.md',
          'app/templates/CONTRIBUTING.md',
          'app/templates/editorconfig',
          'app/templates/gitattributes',
          'app/templates/gitignore',
          'app/templates/travis.yml',
          'app/index.js',
          '.editorconfig',
          '.gitattributes',
          '.gitignore',
          '.travis.yml',
          '.yo-rc.json',
          'CONTRIBUTING.md',
          'package.json',
          'README.md',
        ];

        assert.file(expected);
      });
    });
  });

});
