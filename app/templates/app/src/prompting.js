'use strict';

var _ = require('lodash');
var s = require('underscore.string');
var npmName = require('npm-name');

module.exports = function(<%= s.classify(generatorName) %>) {

  /**
   * Where you prompt users for options (where you'd call `this.prompt()`)
   * @type {Object}
   */
  <%= s.classify(generatorName) %>.prototype.prompting = {
    /**
     * Ask a Github username to init `package.json` generated
     */
    askForGithubUser: function askForGithubUser() {
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: 'someUser'
      }, function (answers) {

        this.props = _.merge(this.props, answers);

        done();
      }.bind(this));
    },

    /**
     * Ask a app name
     * and check if app name is avaible on NPM
     */
    askForAppName: function askForAppName() {
      var done = this.async();

      var prompts = [
        {
          type: 'input',
          name: 'appName',
          message: 'What\'s the name of your application?',
          default: this.appName
        },
        {
          when: function (answers) {
            var cb = this.async();
            var name = answers.appName;

            npmName(name, function (err, available) {
              if (!available || err) {
                cb(true);
              }

              cb(false);
            });
          },
          type: 'confirm',
          name: 'askNameAgain',
          message: 'The name above already exists on NPM, choose another?',
          default: true
        }
      ];

      this.prompt(prompts, function (answers) {
        if (answers.askNameAgain) {
          return this.prompting.askForAppName.call(this);
        }

        answers.appName = s.slugify(s.humanize(answers.appName));

        this.props = _.merge(this.props, answers);

        done();
      }.bind(this));
    }
  };
};
