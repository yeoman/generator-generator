/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('<%= generatorName %>:<%= dirname %>', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../<%= dirname %>'))
      .inDir(path.join(__dirname, './temp'))
      .withArguments('name', '--force')
      .on('end', done);
  });

  it('creates files', function () {
    helpers.assertFile([
      'somefile.js'
    ]);
  });
});
