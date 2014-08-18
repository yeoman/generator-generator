/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('foo:foo', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../'))
      .inDir(path.join(__dirname, './temp'))
      .withOptions({ 'skip-install': true })
      .withArgs('name', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    helpers.assertFile([
      'somefile.js'
    ]);
  });
});
