'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var <%= _s.classify(generatorName) %> = yeoman.generators.Base.extend({

  /**
   * Extend default class 'Base' of yeoman-generator
   * @return {<%= _s.classify(generatorName) %>} a new sub class
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
      'Create your own ' +
      chalk.yellow('Yeoman') +
      ' generator with superpowers!'
    ));
  }
});

/**
 * Require our custom run loop with priorities
 * http://yeoman.io/authoring/running-context.html#the_run_loop
 */
require('./src/initializing')(<%= _s.classify(generatorName) %>);
require('./src/prompting')(<%= _s.classify(generatorName) %>);
require('./src/configuring')(<%= _s.classify(generatorName) %>);
require('./src/writing')(<%= _s.classify(generatorName) %>);
require('./src/install')(<%= _s.classify(generatorName) %>);
require('./src/end')(<%= _s.classify(generatorName) %>);

module.exports = <%= _s.classify(generatorName) %>;
