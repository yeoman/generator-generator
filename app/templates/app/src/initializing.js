'use strict';

var path = require('path');

module.exports = function(<%= _s.classify(generatorName) %>) {

  /**
   * Your initialization methods (checking current project state, getting configs, etc)
   * @type {Object}
   */
  <%= _s.classify(generatorName) %>.prototype.initializing = {
    /**
     * Determine the generatorName either from the current directory
     * or the parameter of the generator
     */
    defaultName: function defaultName() {
      this.generatorName = this.generatorName || path.basename(process.cwd());
      var match = this.generatorName.match(/^generator-(.+)/);

      if (match && match.length === 2) {
        this.generatorName = match[1].toLowerCase();
      }
      console.log('initializing ');
    }
  };

};
