import { describe, it, beforeEach, vi } from "vitest";
import { join } from 'path';
import { file, fileContent } from 'yeoman-assert';
import { run } from 'yeoman-test';
import { writeFileSync } from 'fs';

vi.hoisted(()=> { 
  require.cache[require.resolve('superb')] = { exports: { random: () => "cat's meow" } };
});

describe('generator:subgenerator', () => {
  beforeEach(() => {
    return run(join(__dirname, '../subgenerator'))
      .withArguments(['foo'])
      .withOptions({
        force: true
      })
      .inTmpDir(tmpDir => {
        writeFileSync(
          join(tmpDir, 'package.json'),
          '{"name": "generator-foo", "files":[]}'
        );
      });
  });

  it('creates files', () => {
    file([
      'generators/foo/index.js',
      'generators/foo/templates/dummyfile.txt',
      '__tests__/foo.js'
    ]);
  });

  it('configures the test file', () => {
    fileContent('__tests__/foo.js', "describe('generator-foo:foo");
    fileContent('__tests__/foo.js', '../generators/foo');
  });

  it('escapes possible apostrophes from superb', () => {
    fileContent('generators/foo/index.js', "Welcome to the cat\\'s meow");
  });
});
