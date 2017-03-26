'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const fs = require('fs');
const mockery = require('mockery');

describe('generator:subgenerator', () => {
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', () => {
      return 'cat\'s meow';
    });

    return helpers.run(path.join(__dirname, '../subgenerator'))
      .withArguments(['foo'])
      .withOptions({
        force: true
      })
      .inTmpDir(tmpDir => {
        fs.writeFileSync(
          path.join(tmpDir, 'package.json'),
          '{"name": "generator-foo", "files":[]}'
        );
      });
  });

  after(() => {
    mockery.disable();
  });

  it('creates files', () => {
    assert.file([
      'generators/foo/index.js',
      'generators/foo/templates/dummyfile.txt',
      '__tests__/foo.js'
    ]);
  });

  it('configures the test file', () => {
    assert.fileContent('__tests__/foo.js', 'describe(\'generator-foo:foo');
    assert.fileContent('__tests__/foo.js', '../generators/foo');
  });

  it('escapes possible apostrophes from superb', () => {
    assert.fileContent('generators/foo/index.js', 'Welcome to the cat\\\'s meow');
  });
});
