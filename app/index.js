'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var Generator = yeoman.generators.Base.extend({

  /**
   * Extend default class 'Base' of yeoman-generator
   * @return {Generator} a new sub class
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
require('./src/initializing')(Generator);
require('./src/prompting')(Generator);
require('./src/configuring')(Generator);
require('./src/writing')(Generator);
require('./src/install')(Generator);
require('./src/end')(Generator);

module.exports = Generator;
