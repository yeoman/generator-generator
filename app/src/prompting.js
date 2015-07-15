'use strict';

var _ = require('lodash');
var s = require('underscore.string');
var npmName = require('npm-name');

module.exports = function(SuperbGenerator) {

  /**
   * Where you prompt users for options (where you'd call `this.prompt()`)
   * @type {Object}
   */
  SuperbGenerator.prototype.prompting = {
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
          name: 'generatorName',
          message: 'What\'s the base name of your generator?',
          default: this.generatorName
        },
        {
          when: function (answers) {
            var cb = this.async();
            var name = 'generator-' + answers.generatorName;

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
          return this.prompting.askForGeneratorName.call(this);
        }

        answers.generatorName = s.slugify(s.humanize('generator-' + answers.generatorName));

        this.props = _.merge(this.props, answers);

        done();
      }.bind(this));
    }
  };

};
