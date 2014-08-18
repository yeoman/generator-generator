'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var FooGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the foo subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.copy('somefile.js', 'somefile.js');
  }
});

module.exports = FooGenerator;
