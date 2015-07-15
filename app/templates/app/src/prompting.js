'use strict';

var _ = require('lodash');
var _s = require('underscore.string');
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
     * Ask a generator base name
     * and check if generator name is avaible on NPM
     */
    askForGeneratorName: function askForGeneratorName() {
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
            var done = this.async();
            var name = answers.appName;

            npmName(name, function (err, available) {
              if (!available) {
                done(true);
              }

              done(false);
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
          return this.prompting.askForGeneratorName.call(this);
        }

        answers.appName = s.slugify(s.humanize(answers.appName));

        this.props = _.merge(this.props, answers);

        done();
      }.bind(this));
    },
    recap: function recap() {
      console.log('prompting ');
    }
  };
};
