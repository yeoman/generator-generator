'use strict';

module.exports = function(SuperbGenerator) {

  /**
   * Where installation are run
   */
  SuperbGenerator.prototype.install = function install() {
    this.installDependencies({bower: false});
    console.log('install ');
  };

};
