'use strict';

module.exports = function(<%= _s.classify(generatorName) %>) {

  /**
   * Where installation are run
   */
  <%= _s.classify(generatorName) %>.prototype.install = function install() {
    this.installDependencies({bower: false});
    console.log('install ');
  };

};
