'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var <%= _.classify(generatorName) %>Generator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the <%= generatorName %> subgenerator with the argument ' + this.name + '.');
  },

  writing: function () {
    this.src.copy('somefile.js', 'somefile.js');
  }
});

module.exports = <%= _.classify(generatorName) %>Generator;
