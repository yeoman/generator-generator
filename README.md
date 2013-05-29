# Yeoman Generator for Yeoman Generators
[![Build Status](https://secure.travis-ci.org/yeoman/generator-generator.png?branch=master)](https://travis-ci.org/yeoman/generator-generator)

Maintainer: [Pascal Hartig](https://github.com/passy)

![Yo dawg, I heard you like generators?](http://i.imgur.com/2gqiift.jpg)

`generator-generator` scaffolds out a new basic Yeoman generator with some
sensible defaults.

## Commands

* `yo generator` shows a wizard for generating a new generator
* `yo generator:subgenerator NAME` generates a subgenerator with the name NAME

## What do you get?

`generator-generator` scaffolds out a complete project directory structure for
you.

    .
    ├── app
    │   ├── index.js
    │   └── templates
    │       ├── editorconfig
    │       └── jshintrc
    ├── .editorconfig
    ├── .gitattributes
    ├── .gitignore
    ├── .jshintrc
    ├── LICENSE
    ├── package.json
    ├── README.md
    └── test
        ├── test-creation.js
        └── test-load.js

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-generator`
- Run: `yo generator`

## Changelog

* 0.2.1
    * The name specified in the prompt is now used in `package.json`.
    * `generator-generator` officially replaced the built-in generator that was
      bundled with yo.

* 0.2
    * Added subgenerator for subgenerators
    * Generated generator now generates package.json, component.json and
      installs them by default.

* 0.1.1
    * Upgraded mocha to 1.9.0
    * Include `.travis.yml`

## Contributing

See the [contribution
docs](https://github.com/yeoman/yeoman/blob/master/contributing.md).

When submitting an issue, please follow [the
guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission).
Especially important is to make sure Yeoman is up-to-date, and providing the
command or commands that cause the issue.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
