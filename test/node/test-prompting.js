'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var yeoman = require('yeoman-generator');

var Generator = require('../../app/index.js');

describe('generator-generator prompting script', function () {
  var context = {
    async: function () {return function () {}}
  };

  beforeEach(function() {
    context.props = {};
  });

  describe('askForGithubUser', function () {
    it('should define `githubUser`', function() {
      sinon.spy(Generator.prototype.prompting, 'askForGithubUser');

      context.prompt = sinon.stub().yields({githubUser: 'testUser'});

      Generator.prototype.prompting.askForGithubUser.call(context);

      Generator.prototype.prompting.askForGithubUser.should.have.been.called;
      context.props.should.be.deep.equal({ githubUser: 'testUser' });

      Generator.prototype.prompting.askForGithubUser.restore();
    });
  });

  describe('askForGeneratorName', function () {
    it('should define `generatorName` slugify', function() {
      sinon.spy(Generator.prototype.prompting, 'askForGeneratorName');

      context.prompt = sinon.stub().yields({generatorName: 'sampleNewGenerator'});

      Generator.prototype.prompting.askForGeneratorName.call(context);

      Generator.prototype.prompting.askForGeneratorName.should.have.been.called;
      context.props.should.be.deep.equal({ generatorName: 'generator-sample-new-generator' });

      Generator.prototype.prompting.askForGeneratorName.restore();
    });
  });

});
