# generator-generator [![Build Status](https://secure.travis-ci.org/yeoman/generator-generator.svg?branch=master)](https://travis-ci.org/yeoman/generator-generator)

> Generate a Yeoman generator

Maintainer: [Pascal Hartig](https://github.com/passy)

![Yo dawg, I heard you like generators?](http://i.imgur.com/2gqiift.jpg)


## Getting started

- Install: `npm install -g generator-generator`
- Run: `yo generator`

If during generation you get an error like `API rate limit exceeded`, you need to log in to GitHub
and [create a new API token](https://github.com/settings/tokens/new), then add:
```bash
export GITHUB_TOKEN='YOUR_NEW_TOKEN'
```
to your `.bashrc`, `.zshrc`, `.profile` or another file that is run on shell initialization. In new terminal shells
you shouldn't see this error anymore.


## Commands

* `yo generator` shows a wizard for generating a new generator
* `yo generator:subgenerator NAME` generates a subgenerator with the name NAME


## What do you get?

Scaffolds out a complete project directory structure for you:

    .
    ├── generators
    │   └── app
    │       ├── index.js
    │       └── templates
    │           ├── _bower.json
    │           ├── _package.json
    │           ├── editorconfig
    │           └── jshintrc
    ├── .editorconfig
    ├── .gitattributes
    ├── .gitignore
    ├── .jshintrc
    ├── .travis.yml
    ├── .yo-rc.json
    ├── package.json
    ├── README.md
    └── test
        └── test-app.js


## Contributing

See the [contribution docs](https://github.com/yeoman/yeoman/blob/master/contributing.md).

When submitting an issue, please follow [the
guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission).
Especially important is to make sure Yeoman is up-to-date, and providing the
command or commands that cause the issue.


## License

MIT © Pascal Hartig <phartig@rdrei.net> and other contributors
