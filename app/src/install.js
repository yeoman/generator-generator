'use strict';

module.exports = function(Generator) {

  /**
   * Where installation are run
   */
  Generator.prototype.install = function install() {
    this.installDependencies({bower: false});
  };

};
