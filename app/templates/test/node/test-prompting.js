'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator prompting script', function () {
  var context = {
    async: function () {return function () {}; }
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

  describe('askForAppName', function () {
    it('should define `appName` slugify', function() {
      sinon.spy(Generator.prototype.prompting, 'askForAppName');

      context.prompt = sinon.stub().yields({appName: 'newApp'});

      Generator.prototype.prompting.askForAppName.call(context);

      Generator.prototype.prompting.askForAppName.should.have.been.called;
      context.props.should.be.deep.equal({ appName: 'new-app' });

      Generator.prototype.prompting.askForAppName.restore();
    });
  });

});
