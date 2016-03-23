'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  // Note: arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes 'arg' an optional argument.
    this.argument('arg', { type: String, required: false });

    // And you can then access it later on this way; e.g. in lower case
    this.lcArg = (this.arg ? this.arg.toLocaleLowerCase() : '');

    // This adds support for the '--someOption' flag; can use '-o' as well
    this.option('someOption', {alias: 'o', type: Boolean, defaults: false});
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the <%- superb %> ' + chalk.red('<%= generatorName %>') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
