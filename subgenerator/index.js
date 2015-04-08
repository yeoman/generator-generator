'use strict';
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

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
    this.dirname = _s.dasherize(this.name);
    var pkg = this.fs.readJSON(this.destinationPath('package.json'));
    pkg.files = pkg.files || [];
    pkg.files.push(this.dirname);
    this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkg, null, 2));
    this.generatorName = _s.classify(pkg.name.replace(/^generator-/, ''));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('templates/somefile.js'),
      this.destinationPath(this.dirname, '/templates/somefile.js')
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(this.dirname, '/index.js'),
      { generatorName: this.generatorName }
    );
    this.fs.copyTpl(
      this.templatePath('test-subgenerator.js'),
      this.destinationPath('test/'+ this.dirname +'.js'),
      { generatorName: this.generatorName, dirname: this.dirname }
    );
  }
});
