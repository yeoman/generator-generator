'use strict';

module.exports = function(<%= s.classify(generatorName) %>) {

  /**
   * Configure the project
   * and saving configurations in `.yo-rc.json`
   */
  <%= s.classify(generatorName) %>.prototype.configuring = {
    /**
     * Set `.yo-rc.json` value with object `this.props`
     */
    setYoRc: function setYoRc() {
      this.config.set('props', this.props);
    }
  };

};
