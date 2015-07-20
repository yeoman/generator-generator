'use strict';

module.exports = function(Generator) {

  /**
   * Configure the project
   * and saving configurations in `.yo-rc.json`
   */
  Generator.prototype.configuring = {
    /**
     * Set `.yo-rc.json` value with object `this.props`
     */
    setYoRc: function setYoRc() {
      this.config.set('props', this.props);
    }
  };

};
