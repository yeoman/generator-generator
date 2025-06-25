'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const generatorGeneratorPkg = require('../package.json');

jest.mock('superb', () => ({ random: () => "cat's meow" }));
jest.mock('npm-name', () => () => Promise.resolve(true));

describe('generator:app', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../app')).withPrompts({
        name: 'generator-temp',
        description: 'A node generator',
        homepage: 'http://yeoman.io',
        githubAccount: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: [],
        license: 'MIT'
      });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.strictEqual(path.basename(process.cwd()), 'generator-temp');
    });

    it('creates files', () => {
      const expected = [
        '.eslintignore',
        'README.md',
        'package.json',
        'generators/app/index.js',
        'generators/app/templates/dummyfile.txt',
        '__tests__/app.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        name: 'generator-temp',
        dependencies: {
          'yeoman-generator': generatorGeneratorPkg.dependencies['yeoman-generator'],
          chalk: generatorGeneratorPkg.dependencies.chalk,
          yosay: generatorGeneratorPkg.dependencies.yosay
        },
        devDependencies: {
          'yeoman-test': generatorGeneratorPkg.devDependencies['yeoman-test'],
          'yeoman-assert': generatorGeneratorPkg.devDependencies['yeoman-assert']
        },
        keywords: ['yeoman-generator'],
        main: 'generators/app/index.js',
        files: ['generators/app']
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', '# generator-temp');
      assert.fileContent('README.md', 'npm install -g yo');
      assert.fileContent('README.md', 'npm install -g generator-temp');
      assert.fileContent('README.md', 'yo temp');
      assert.fileContent('README.md', 'yeoman/generator-temp');
    });

    it('fills the .eslintignore with correct content', () => {
      assert.fileContent('.eslintignore', '**/templates\n');
    });
  });

  describe('scoped name', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../app')).withPrompts({
        name: '@yeoman/generator-temp',
        description: 'A node generator',
        homepage: 'http://yeoman.io',
        githubAccount: 'yeoman',
        authorName: 'The Yeoman Team',
        authorEmail: 'hi@yeoman.io',
        authorUrl: 'http://yeoman.io',
        keywords: [],
        license: 'MIT'
      });
    });

    it('created and CD into a folder named like the generator', () => {
      assert.strictEqual(path.basename(process.cwd()), 'generator-temp');
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        name: '@yeoman/generator-temp'
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', '# @yeoman/generator-temp');
      assert.fileContent('README.md', 'npm install -g yo');
      assert.fileContent('README.md', 'npm install -g @yeoman/generator-temp');
      assert.fileContent('README.md', 'yo @yeoman/temp');
    });
  });
});
