'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var mockery = require('mockery');

describe('generator:subgenerator', function () {
  before(function (done) {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', function () {
      return 'cat\'s meow';
    });

    helpers.run(path.join(__dirname, '../subgenerator'))
      .withArguments(['foo', '--force'])
      .inTmpDir(function (tmpDir) {
        fs.writeFileSync(
          path.join(tmpDir, 'package.json'),
          '{"name": "generator-foo", "files":[]}'
        );
      })
      .on('end', done);
  });

  after(function () {
    mockery.disable();
  });

  it('creates files', function () {
    assert.file([
      'generators/foo/index.js',
      'generators/foo/templates/dummyfile.txt',
      'test/foo.js'
    ]);
  });

  it('escapes possible apostrophes from superb', function () {
    assert.fileContent('generators/foo/index.js', 'Welcome to the cat\\\'s meow');
  });
});
