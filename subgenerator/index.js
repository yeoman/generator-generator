'use strict';
var yeoman = require('yeoman-generator');

var SubGeneratorGenerator = module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  initializing: function () {
    var pkg = this.dest.readJSON('package.json');
    pkg.files = pkg.files || [];
    pkg.files.push(this.name);
    this.dest.write('package.json', JSON.stringify(pkg, null, 2));

    this.generatorName = pkg.name.replace(/^generator-/, '');
    this.dirname = this._.dasherize(this.name);
  },

  writing: function () {
    this.dest.mkdir(this.dirname);
    this.dest.mkdir(this.dirname + '/templates');
    this.dest.mkdir('test');
    this.template('index.js', this.dirname + '/index.js');
    this.src.copy('templates/somefile.js', this.dirname + '/templates/somefile.js');
    this.template('test-subgenerator.js', 'test/test-'+ this.dirname +'.js');
  }
});
