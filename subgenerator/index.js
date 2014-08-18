'use strict';
var yeoman = require('yeoman-generator');

var SubGeneratorGenerator = module.exports = yeoman.generators.NamedBase.extend({
  initializing: function () {
    var pkg = this.dest.readJSON('package.json');
    pkg.files = pkg.files || [];
    pkg.files.push(this.name);
    this.dest.write('package.json', JSON.stringify(pkg, null, 2));

    this.generatorName = pkg.name.replace(/^generator-/, '');
    this.dirname = this._.dasherize(this.name);
  },

  writing: function () {
    this.mkdir(this.dirname);
    this.mkdir(this.dirname + '/templates');
    this.mkdir('test');
    this.copy('index.js', this.dirname + '/index.js');
    this.copy('templates/somefile.js', this.dirname + '/templates/somefile.js');
    this.copy('test-subgenerator.js', 'test/test-'+ this.dirname +'.js');
  }
});
