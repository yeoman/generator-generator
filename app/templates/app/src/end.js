'use strict';

module.exports = function(SuperbGenerator) {

  /**
   * Called last, cleanup, say good bye, etc
   */
  SuperbGenerator.prototype.end = {
    recap: function recap() {
      console.log('end ');
      this.log(JSON.stringify(this.props, null, 4));
    }
  };

};
