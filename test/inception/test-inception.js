'use strict';

var assert = require('yeoman-generator').assert;

var inception = require('../inception');

describe('generator-yeoman-generator inception tests', function () {
  var sampleGenerator;

  this.timeout(100000);

  describe('with an existing user on Github', function () {
    before(function() {
      return inception.prepare({}, {
        githubUser: 'zckrs',
        generatorName: 'newAwesomeTech'
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
          'app/templates/eslintrc',
          'app/templates/gitattributes',
          'app/templates/gitignore',
          'app/templates/travis.yml',
          'app/index.js',
          'test/node/test-configuring.js',
          'test/node/test-end.js',
          'test/node/test-index.js',
          'test/node/test-initializing.js',
          'test/node/test-install.js',
          'test/node/test-prompting.js',
          'test/node/test-writing.js',
          'test/.eslintrc',
          '.editorconfig',
          '.eslintignore',
          '.eslintrc',
          '.gitattributes',
          '.gitignore',
          '.travis.yml',
          '.yo-rc.json',
          'CONTRIBUTING.md',
          'package.json',
          'README.md'
        ];

        assert.file(expected);
      });
    });

    it('should pass test', function () {
      return inception.test();
    });
  });

});
