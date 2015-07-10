'use strict';

module.exports = function(<%= _s.classify(generatorName) %>) {

  /**
   * Where you write the generator specific files
   * @type {Object}
   */
  <%= _s.classify(generatorName) %>.prototype.writing = {
    /*
     * Aplly templating on files
     */
    copyTpl: function copyTpl() {
      this.fs.copy(this.templatePath() + '/**', this.destinationPath(), this.props);
    },

    /*
     * Move them
     */
    move: function move() {
      var mv = function (from, to) {
		    this.fs.move(this.destinationPath(from), this.destinationPath(to));
			}.bind(this);

      mv('_package.json', 'package.json');
			mv('_travis.yml', 'travis.yml');
      mv('editorconfig', '.editorconfig');
			mv('gitattributes', '.gitattributes');
			mv('gitignore', '.gitignore');
    },

    recap: function recap() {
      console.log('writing ');
    }
  };

};
