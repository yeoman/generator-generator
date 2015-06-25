'use strict'
yeoman = require 'yeoman-generator'

class SubGenerator extends yeoman.generators.Base

    initializing: ->
        @argument 'name',
            required: true
            type: String
            desc: 'The subgenerator name'
        @log "You called the <%= generatorName %> subgenerator with the argument #{@name}."

    writing: ->
        @fs.copy (@templatePath 'somefile.js'), (@destinationPath 'somefile.js')

module.exports = SubGenerator
