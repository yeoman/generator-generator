import path from 'path';
import Generator from 'yeoman-generator';
import superb from 'superb';

export default class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      required: true,
      description: 'Generator name'
    });
  }

  writing() {
    const generatorName = this.fs.readJSON(this.destinationPath('package.json')).name;

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(path.join('generators', this.options.name, 'index.js')),
      {
        // Escape apostrophes from superb to not conflict with JS strings
        superb: superb.random().replace("'", "\\'"),
        generatorName
      }
    );

    this.fs.copy(
      this.templatePath('templates/**'),
      this.destinationPath(path.join('generators', this.options.name, 'templates'))
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('__tests__/' + this.options.name + '.js'),
      {
        name: this.options.name,
        generatorName
      }
    );
  }
}
