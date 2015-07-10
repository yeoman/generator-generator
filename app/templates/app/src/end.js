'use strict';

var chalk = require('chalk');

module.exports = function(<%= _s.classify(generatorName) %>) {

  /**
   * Called last, cleanup, say good bye, etc
   */
   <%= _s.classify(generatorName) %>.prototype.end = function end() {
     console.log('end ');
     this.log(JSON.stringify(this.props, null, 4));
     this.log(
       chalk.bold('My work is now finished.\n') +
       chalk.bold.yellow('Your turn to play.\n') +
       chalk.bold('Bye.\n')
     );
   };

};
