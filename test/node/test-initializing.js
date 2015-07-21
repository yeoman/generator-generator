'use strict';

var path = require('path');

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator-yeoman-generator initializing script', function () {
  var context = {
    async: function () { return function () {}; }
  };

  describe('defaultGeneratorName', function () {

    beforeEach(function() {
      sinon.spy(Generator.prototype.initializing, 'defaultGeneratorName');
    });

    afterEach(function() {
      Generator.prototype.initializing.defaultGeneratorName.restore();
    });

    it('`generatorName` slurp the base name "generator-"', function() {
      context.generatorName = 'generator-temp';

      Generator.prototype.initializing.defaultGeneratorName.call(context);

      Generator.prototype.initializing.defaultGeneratorName.should.have.been.called;
      context.generatorName.should.be.equal('temp');
    });
    it('`generatorName` can be "generator-"', function() {
      context.generatorName = 'generator-';

      Generator.prototype.initializing.defaultGeneratorName.call(context);

      Generator.prototype.initializing.defaultGeneratorName.should.have.been.called;
      context.generatorName.should.be.equal('generator-');
    });
    it('should define default `generatorName` based on cwd if no argument', function() {
      context.generatorName = undefined;

      Generator.prototype.initializing.defaultGeneratorName.call(context);

      Generator.prototype.initializing.defaultGeneratorName.should.have.been.called;
      context.generatorName.should.be.equal(process.cwd().split(path.sep).pop().replace('generator-', ''));
    });
    it('should define default `generatorName` based on first argument', function() {
      context.generatorName = 'temp-generator';

      Generator.prototype.initializing.defaultGeneratorName.call(context);

      Generator.prototype.initializing.defaultGeneratorName.should.have.been.called;
      context.generatorName.should.be.equal('temp-generator');
    });
  });

  describe('defaultUsername', function () {
    context.user = {
      git: {
        name: sinon.stub().returns('Unicorn User'),
        email: sinon.stub().returns('unicorn.user@superb.com')
      }
    };

    beforeEach(function() {
      sinon.spy(Generator.prototype.initializing, 'defaultUsername');
    });

    afterEach(function() {
      Generator.prototype.initializing.defaultUsername.restore();
    });

    it('should define a default gitUser with Github API', function() {
      context.user.github = {
        username: sinon.stub().yields(null, 'githubUnicornUser')
      };

      Generator.prototype.initializing.defaultUsername.call(context);

      Generator.prototype.initializing.defaultUsername.should.have.been.called;
      context.user.git.name.should.have.been.called;
      context.user.git.email.should.have.been.called;
      context.user.github.username.should.have.been.called;
      context.gitUser.should.be.deep.equal({
        name: 'Unicorn User',
        login: 'githubUnicornUser',
        email: 'unicorn.user@superb.com',
        htmlUrl: 'https://github.com/githubUnicornUser'
      });
    });
    it('should define a default gitUser with placeholder if could not find a username for the supplied email', function() {
      context.user.github = {
        username: sinon.stub().yields(true, null)
      };
      context.log = {
        error: sinon.stub()
      };

      Generator.prototype.initializing.defaultUsername.call(context);

      Generator.prototype.initializing.defaultUsername.should.have.been.called;
      context.user.git.name.should.have.been.called;
      context.user.git.email.should.have.been.called;
      context.user.github.username.should.have.been.called;
      context.log.error.should.have.been.called;
      context.gitUser.login.should.be.equal('unicornUser');
      context.gitUser.htmlUrl.should.be.equal('');
    });
  });

});
