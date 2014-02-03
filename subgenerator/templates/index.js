'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var <%= _.classify(generatorName) %>Generator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('You called the <%= generatorName %> subgenerator with the argument ' + this.name + '.');
  },

  files: function () {
    this.copy('somefile.js', 'somefile.js');
  }
});

module.exports = <%= _.classify(generatorName) %>Generator;