'use strict';

var path = require('path');
var _ = require('lodash');
var Promise = require('bluebird');
var helpers = require('yeoman-generator').test;
var spawn = require('cross-spawn');

var testDirectory = Promise.promisify(helpers.testDirectory);

var skipOptions = {
  skipInstall: true,
  skipWelcomeMessage: true,
  skipMessage: true
};

var tempDir = path.join(__dirname, 'tmp/work');

function prepare(optionCase, promptCase) {
  var options = _.extend({}, optionCase, skipOptions);
  var prompts = _.extend({}, promptCase);

  return testDirectory(tempDir).then(function() {
    var sampleGenerator = helpers.createGenerator(
      'yeoman-generator',
      ['../../../app'],
      false,
      options
    );
    helpers.mockPrompt(sampleGenerator, prompts);

    return sampleGenerator;
  });
}

function run(generator) {
  return new Promise(function(resolve, reject) {
    generator.conflicter.force = true;
    generator.on('error', function (e) {
      reject(e);
    });
    generator.on('end', function () {
      resolve();
    });
    generator.run();
  });
}

function test() {
  return new Promise(function(resolve, reject) {
    var npmProcess = spawn('npm', ['test'], {stdio: 'inherit'});
    npmProcess.on('exit', function(returnCode) {
      if(returnCode === 0) {
        resolve();
      } else {
        reject('NPM test returned with error code ' + returnCode);
      }
    });
  });
}

module.exports = {
  prepare: prepare,
  run: run,
  test: test
};
