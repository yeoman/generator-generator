'use strict';

var path = require('path');
var _ = require('lodash');
var Promise = require('bluebird');
var helpers = require('yeoman-generator').test;

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

module.exports = {
  prepare: prepare,
  run: run
};
