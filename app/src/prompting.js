'use strict';

var _ = require('lodash');
var s = require('underscore.string');

module.exports = function(Generator) {

  /**
   * Where you prompt users for options (where you'd call `this.prompt()`)
   * @type {Object}
   */
  Generator.prototype.prompting = {
    /**
     * Ask a Github username
     */
    askForGithubUser: function askForGithubUser() {
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'githubUsername',
        message: 'Would you mind telling me your username on GitHub?',
        default: this.gitUser.login
      }, function (answers) {

        this.props.gitUser = this.gitUser;
        this.props.gitUser.login = answers.githubUsername;

        done();
      }.bind(this));
    },

    /**
     * Ask a generator base name
     * and check if generator name is avaible on NPM
     */
    askForGeneratorName: function askForGeneratorName() {
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'generatorName',
        message: 'What\'s the base name of your generator?',
        default: this.generatorName
      }, function (answers) {

        answers.generatorName = s.slugify(s.humanize('generator-' + answers.generatorName));

        this.props = _.merge(this.props, answers);

        done();
      }.bind(this));
    }
  };

};
