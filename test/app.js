'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const mockery = require('mockery');
const generatorGeneratorPkg = require('../package.json');

describe('generator:app', () => {
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('superb', () => {
      return 'cat\'s meow';
    });

    mockery.registerMock('npm-name', () => {
      return Promise.resolve(true);
    });
  });

  after(() => {
    mockery.disable();
  });

  describe('defaults', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
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
      assert.equal(path.basename(process.cwd()), 'generator-temp');
    });

    it('creates files', () => {
      const expected = [
        'README.md',
        'package.json',
        'generators/app/index.js',
        'generators/app/templates/dummyfile.txt',
        'test/app.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('package.json', { // eslint-disable-line new-cap
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
        keywords: ['yeoman-generator']
      });
    });

    it('fills the README with project data', () => {
      assert.fileContent('README.md', '# generator-temp');
      assert.fileContent('README.md', 'npm install -g yo');
      assert.fileContent('README.md', 'npm install -g generator-temp');
      assert.fileContent('README.md', 'yo temp');
      assert.fileContent('README.md', 'yeoman/generator-temp');
    });
  });
});
