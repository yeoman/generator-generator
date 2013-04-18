'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var FooGenerator = module.exports = function FooGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the foo subgenerator with the argument ' + this.name + '.');
};

util.inherits(FooGenerator, yeoman.generators.NamedBase);

FooGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
