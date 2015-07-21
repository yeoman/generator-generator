'use strict';

var _ = require('lodash');
var s = require('underscore.string');

module.exports = function(<%= s.classify(generatorName) %>) {

  /**
   * Where you prompt users for options (where you'd call `this.prompt()`)
   * @type {Object}
   */
  <%= s.classify(generatorName) %>.prototype.prompting = {
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
     * Ask a app name
     * and check if app name is avaible on NPM
     */
    askForAppName: function askForAppName() {
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'appName',
        message: 'What\'s the name of your application?',
        default: this.appName
      }, function (answers) {

        answers.appName = s.slugify(s.humanize(answers.appName));

        this.props = _.merge(this.props, answers);

        done();
      }.bind(this));
    }
  };

};
