'use strict';

module.exports = function(<%= _s.classify(generatorName) %>) {

  /**
   * Called last, cleanup, say good bye, etc
   */
  <%= _s.classify(generatorName) %>.prototype.end = {
    recap: function recap() {
      console.log('end ');
      this.log(JSON.stringify(this.props, null, 4));
    }
  };

};
