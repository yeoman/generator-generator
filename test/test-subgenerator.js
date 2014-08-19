/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');
var os = require('os');

describe('generator:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../subgenerator'))
      .inDir(path.join(os.tmpdir(), '/yeoman-test'), function (dir) {
        fs.writeFileSync(path.join(dir, 'package.json'), '{"name": "generator-foo", "files":[]}');
      })
      .withArguments(['foo', '--force'])
      .on('end', done);
  });

  it('creates files', function () {
    var expected = [
      'foo/index.js',
      'foo/templates/somefile.js',
    ];
    assert.file(expected);
  });

  it('update package.json file array', function () {
    var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.equal(pkg.files[0], 'foo');
  });
});
