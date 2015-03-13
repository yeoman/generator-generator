'use strict';
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');

describe('generator:subgenerator', function () {
  before(function (done) {
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

  it('creates files', function () {
    assert.file([
      'foo/index.js',
      'foo/templates/somefile.js'
    ]);
  });

  it('update package.json file array', function () {
    var pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.equal(pkg.files[0], 'foo');
  });
});
