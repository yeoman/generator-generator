'use strict'
yeoman = require 'yeoman-generator'
chalk  = require 'chalk'
yosay  = require 'yosay'

class Generator extends yeoman.generators.Base

    prompting : ->
        done = @async()
        @log yosay "Welcome to the <%= superb.replace('\'', '\\\'') %> #{chalk.red('<%= generatorName %>')} generator!"
        prompts = [{
            type    : 'confirm'
            name    : 'someOption'
            message : 'Would you like to enable this option?'
            default : yes
        }]
        @prompt prompts, (props) =>
            @props = props
            # To access props later use @props.someOption

            done()

    writing:
        app: ->
            @fs.copy (@templatePath '_package.json'), (@destinationPath 'package.json')
            @fs.copy (@templatePath '_bower.json'), (@destinationPath 'bower.json')
        projectfiles: ->
            @fs.copy (@templatePath 'editorconfig'), (@destinationPath '.editorconfig')
            @fs.copy (@templatePath 'jshintrc'), (@destinationPath '.jshintrc')

    install: -> @installDependencies()

module.exports = Generator
