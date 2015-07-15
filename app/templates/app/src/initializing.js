'use strict';

var path = require('path');

module.exports = function(<%= s.classify(generatorName) %>) {

  /**
   * Your initialization methods (checking current project state, getting configs, etc)
   * @type {Object}
   */
  <%= s.classify(generatorName) %>.prototype.initializing = {
    /**
     * Determine the generatorName either from the current directory
     * or the parameter of the generator
     */
    defaultName: function defaultName() {
      this.appName = this.appName || path.basename(process.cwd());
    }
  };

};
