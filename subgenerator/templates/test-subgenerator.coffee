'use strict'
path = require 'path'
assert = (require 'yeoman-generator').assert
helpers = (require 'yeoman-generator').test

describe '<%= generatorName %>:<%= dirname %>', ->

    before (done) ->
        helpers.run path.join __dirname, '../<%= dirname %>'
        .withArguments 'name'
        .withOptions
            skipInstall: true
            force: true
        .on 'end', done

    it 'creates files', ->
        assert.file [
            'somefile.js'
        ]
