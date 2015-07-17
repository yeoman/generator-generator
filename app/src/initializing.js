'use strict';

var path = require('path');

module.exports = function(SuperbGenerator) {

  /**
   * Your initialization methods (checking current project state, getting configs, etc)
   * @type {Object}
   */
  SuperbGenerator.prototype.initializing = {
    /**
     * Determine the generatorName either from the current directory
     * or the parameter of the generator
     */
    defaultGeneratorName: function defaultGeneratorName() {
      this.generatorName = this.generatorName || path.basename(process.cwd());
      var match = this.generatorName.match(/^generator-(.+)/);

      if (match && match.length === 2) {
        this.generatorName = match[1].toLowerCase();
      }
    },

    /**
     * Determine the username by .gitconfig and GithubAPI
     */
    defaultUsername: function defaultUsername() {
      var done = this.async();

      this.gitUser = {
        name: this.user.git.name(),
        login: 'unicornUser',
        email: this.user.git.email(),
        htmlUrl: ''
      };

      this.user.github.username(function (err, username) {
        if (err) {
          this.log.error(err);
          return;
        }

        this.gitUser.login = username;
        this.gitUser.htmlUrl = 'https://github.com/' + this.gitUser.login;

        done();
      }.bind(this));
    }
  };

};
