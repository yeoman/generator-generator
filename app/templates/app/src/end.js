'use strict';

var chalk = require('chalk');

module.exports = function(<%= s.classify(generatorName) %>) {

  /**
   * Called last, cleanup, say good bye, etc
   */
   <%= s.classify(generatorName) %>.prototype.end = function end() {
     this.log(
       chalk.bold('My work is now finished.\n') +
       chalk.bold.yellow('Your turn to play.\n') +
       chalk.bold('Bye.\n')
     );
   };

};
