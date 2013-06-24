'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var <%= _.classify(generatorName) %>Generator = module.exports = function <%= _.classify(generatorName) %>Generator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the <%= generatorName %> subgenerator with the argument ' + this.name + '.');
};

util.inherits(<%= _.classify(generatorName) %>Generator, yeoman.generators.NamedBase);

<%= _.classify(generatorName) %>Generator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
