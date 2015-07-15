'use strict';

module.exports = function(<%= s.classify(generatorName) %>) {

  /**
   * Where installation are run
   */
  <%= s.classify(generatorName) %>.prototype.install = function install() {
    this.installDependencies({bower: false});
    console.log('install ');
  };

};
