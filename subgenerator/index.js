'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
    this.option('coffee', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'When specified, will scaffold a coffeescript version.'
    });
  },

  initializing: function () {
    var prefix = this.config.get('structure') === 'flat' ? '' : 'generators/';
    this.generatorFolder = _s.dasherize(this.name);
    this.dirname = path.join(prefix, this.generatorFolder);
    var pkg = this.fs.readJSON(this.destinationPath('package.json'));

    if (this.config.get('structure') === 'flat') {
      pkg.files = pkg.files || [];
      pkg.files.push(this.dirname);
      this.fs.write(this.destinationPath('package.json'), JSON.stringify(pkg, null, 2));
    }

    this.generatorName = _s.classify(pkg.name.replace(/^generator-/, ''));
    this.forCoffeeScript = this.options.coffee ? true : false;
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('templates/somefile.js'),
      this.destinationPath(this.dirname, '/templates/somefile.js')
    );

    this.fs.copyTpl(
      this.templatePath('index.' + (this.forCoffeeScript ? 'coffee' : 'js')),
      this.destinationPath(this.dirname, '/index.' + (this.forCoffeeScript ? 'coffee' : 'js')),
      { generatorName: this.generatorName }
    );

    this.fs.copyTpl(
      this.templatePath('test-subgenerator.' + (this.forCoffeeScript ? 'coffee' : 'js')),
      this.destinationPath('test/' + this.generatorFolder + (this.forCoffeeScript ? '.coffee' : '.js')),
      { generatorName: this.generatorName, dirname: this.dirname }
    );

    if (this.forCoffeeScript) {
      this.fs.copyTpl(
        this.templatePath('index.coffee.js'),
        this.destinationPath(this.dirname, '/index.js')
      );
      this.fs.copyTpl(
        this.templatePath('test-subgenerator.coffee.js'),
        this.destinationPath('test/' + this.generatorFolder + '.js'),
        { generatorFolder: this.generatorFolder}
      );
    }
  }
});
