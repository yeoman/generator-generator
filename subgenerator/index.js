// TODO replace most code with generator:base
'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  defaults: function () {
    this.composeWith('generator:base', {
      options: {
        flat: this.config.get('structure') === 'flat',
        name: this.name
      }
    }, {
      local: require.resolve('../base')
    });
  }
});
