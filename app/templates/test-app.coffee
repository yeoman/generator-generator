'use strict'
path = require 'path'
assert = (require 'yeoman-generator').assert
helpers = (require 'yeoman-generator').test
os = require 'os'

describe '<%= generatorName %>:app', ->

    before (done) ->
        helpers.run path.join __dirname, '../<%= prefix %>app'
        .withOptions
            skipInstall: true
        .withPrompts
            someOption: true
        .on 'end', done

    it 'creates files', ->
        assert.file [
            'bower.json'
            'package.json'
            '.editorconfig'
            '.jshintrc'
        ]
