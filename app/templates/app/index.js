'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var <%= s.classify(generatorName) %> = yeoman.generators.Base.extend({

  /**
   * Extend default class 'Base' of yeoman-generator
   * @return {<%= s.classify(generatorName) %>} a new sub class
   */
  constructor: function constructor() {
    yeoman.generators.Base.apply(this, arguments);

    // Define arguments
    this.argument('appName', {
      type: String,
      required: false
    });

    // Create data object for templating
    this.props = {
      version: require('../package.json').version
    };

    // Print message
    this.log(yosay(
      'Scaffold an application with ' +
      chalk.yellow('Yeoman') +
      ' generator.'
    ));
  }
});

/**
 * Require our custom run loop with priorities
 * http://yeoman.io/authoring/running-context.html#the_run_loop
 */
require('./src/initializing')(<%= s.classify(generatorName) %>);
require('./src/prompting')(<%= s.classify(generatorName) %>);
require('./src/configuring')(<%= s.classify(generatorName) %>);
require('./src/writing')(<%= s.classify(generatorName) %>);
require('./src/install')(<%= s.classify(generatorName) %>);
require('./src/end')(<%= s.classify(generatorName) %>);

module.exports = <%= s.classify(generatorName) %>;
