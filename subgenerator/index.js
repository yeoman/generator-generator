'use strict';
var yeoman = require('yeoman-generator');

var SubGeneratorGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    var pkg = this.dest.readJSON('package.json');
    pkg.files = pkg.files || [];
    pkg.files.push(this.name);
    this.dest.write('package.json', JSON.stringify(pkg, null, 2));

    this.generatorName = this.name;
    this.dirname = this._.dasherize(this.name);
  },

  writing: function () {
    this.mkdir(this.dirname);
    this.mkdir(this.dirname + '/templates');
    this.copy('index.js', this.dirname + '/index.js');
    this.copy('templates/somefile.js', this.dirname + '/templates/somefile.js');
  }
});

module.exports = SubGeneratorGenerator;
