import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import fs from 'fs';
import { jest } from '@jest/globals';

import { __dirname } from './dirname.cjs';

jest.mock('superb', () => ({ random: () => "cat's meow" }));

describe('generator:subgenerator', () => {
  beforeEach(() => {
    return helpers
      .run(path.join(__dirname, '../subgenerator'))
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

  it('creates files', () => {
    assert.file([
      'generators/foo/index.js',
      'generators/foo/templates/dummyfile.txt',
      '__tests__/foo.js'
    ]);
  });

  it('configures the test file', () => {
    assert.fileContent('__tests__/foo.js', "describe('generator-foo:foo");
    assert.fileContent('__tests__/foo.js', '../generators/foo');
  });

  it('escapes possible apostrophes from superb', () => {
    assert.fileContent('generators/foo/index.js', "Welcome to the cat\\'s meow");
  });
});
