'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var SuperbGenerator = yeoman.generators.Base.extend({

  /**
   * Extend default class 'Base' of yeoman-generator
   * @return {SuperbGenerator} a new sub class
   */
  constructor: function constructor() {
    yeoman.generators.Base.apply(this, arguments);

    // Define arguments
    this.argument('generatorName', {
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
require('./src/initializing')(SuperbGenerator);
require('./src/prompting')(SuperbGenerator);
require('./src/configuring')(SuperbGenerator);
require('./src/writing')(SuperbGenerator);
require('./src/install')(SuperbGenerator);
require('./src/end')(SuperbGenerator);

module.exports = SuperbGenerator;
