'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');

describe('generator:subgenerator --coffeescript', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../subgenerator'))
      .withOptions({
        coffee: true
      })
      .withArguments(['foo', '--force'])
      .inTmpDir(function (tmpDir) {
        fs.writeFileSync(
          path.join(tmpDir, 'package.json'),
          '{"name": "generator-foo", "files":[]}'
        );
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'generators/foo/index.js',
      'generators/foo/index.coffee',
      'generators/foo/templates/somefile.js',
      'test/foo.js',
      'test/foo.coffee'
    ]);
  });
});

describe('generator:subgenerator --coffeescript (with flat structure)', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../subgenerator'))
      .withOptions({
        coffee: true
      })
      .withArguments(['foo', '--force'])
      .withLocalConfig({ structure: 'flat' })
      .inTmpDir(function (tmpDir) {
        fs.writeFileSync(
          path.join(tmpDir, 'package.json'),
          '{"name": "generator-foo", "files":[]}'
        );
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'foo/index.js',
      'foo/index.coffee',
      'foo/templates/somefile.js',
      'test/foo.js',
      'test/foo.coffee'
    ]);
  });

  it('update package.json file array', function () {
    var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.equal(pkg.files[0], 'foo');
  });
});
