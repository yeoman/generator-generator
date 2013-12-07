# generator-generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-generator.png?branch=master)](https://travis-ci.org/yeoman/generator-generator)

> Yeoman generator for Yeoman generators  
> Scaffolds out a new basic Yeoman generator with some sensible defaults.

Maintainer: [Pascal Hartig](https://github.com/passy)

![Yo dawg, I heard you like generators?](http://i.imgur.com/2gqiift.jpg)


## Getting started

- Install: `npm install -g generator-generator`
- Run: `yo generator`


## Commands

* `yo generator` shows a wizard for generating a new generator
* `yo generator:subgenerator NAME` generates a subgenerator with the name NAME


## What do you get?

Scaffolds out a complete project directory structure for you:

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


## Changelog

* 0.3.0
    * Updated for generator 0.13.0.
    * Added yo peer dependency.

* 0.2.2
    * Updated dependencies.

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

See the [contribution docs](https://github.com/yeoman/yeoman/blob/master/contributing.md).

When submitting an issue, please follow [the
guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission).
Especially important is to make sure Yeoman is up-to-date, and providing the
command or commands that cause the issue.


## License

MIT © Pascal Hartig <phartig@rdrei.net> and other contributors
