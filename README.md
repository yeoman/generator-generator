# Yeoman Generator for Yeoman Generators
[![Build Status](https://secure.travis-ci.org/passy/generator-generator.png?branch=master)](https://travis-ci.org/passy/generator-generator)

![Yo dawg, I heard you like generators?](http://cdn.memegenerator.net/instances/400x/35608541.jpg)

`generator-generator` scaffolds out a new basic Yeoman generator with some
sensible defaults.

## How is this different from the built-in generator?

The built-in `yo generator` command only generates an `index.js` file for you.
`generator-generator` instead comes with a full project directory structure:

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

Last but not least, you don't need to copy-paste the ASCII Art Yeoman anymore.
\o/

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator **locally**: `npm install generator-generator`
- Run: `yo generator:app` (Be sure to include `:app` as `generator` alone is part of yeoman itself.)

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License) |
(c) [Pascal Hartig](https://twitter.com/passy)
