'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('<%- generatorName %>:<%- name %>', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/<%- name %>'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
