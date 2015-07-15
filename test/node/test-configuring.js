'use strict';

var mockery = require('mockery');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false,
  useCleanCache: true
});

var ghGotMock = sinon.stub();

// replace the module `gh-got` with a stub object
mockery.registerMock('gh-got', ghGotMock);

var Generator = require('../../app/index.js');

describe('generator-generator configuring script', function () {
  var context = {
    async: function () { return function () {}; }
  };

  describe('fetchUserInfo', function () {

    beforeEach(function() {
      sinon.spy(Generator.prototype.configuring, 'fetchUserInfo');
      context.props = {};
    });

    afterEach(function () {
      Generator.prototype.configuring.fetchUserInfo.restore();
    });

    it('should fetch user info on Github API', function() {
      ghGotMock.yields(null, {
        name: 'Sample User',
        login: 'sampleUser',
        email: 'sampleUser@azerty.com',
        html_url: 'https://github.com/sampleUser' // eslint-disable-line camelcase
      });

      context.props.githubUser = 'sampleUser';

      Generator.prototype.configuring.fetchUserInfo.call(context);

      Generator.prototype.configuring.fetchUserInfo.should.have.been.called;
      ghGotMock.called.should.be.equal(true);
      context.props.should.be.deep.equal(
        {
          githubUser: {
            name: 'Sample User',
            login: 'sampleUser',
            email: 'sampleUser@azerty.com',
            htmlUrl: 'https://github.com/sampleUser'
          }
        }
      );
    });
    it('should create default user info if no user found by Github API', function() {
      ghGotMock.yields(true, {});

      context.props.githubUser = 'sampleUser';
      context.log = { error: sinon.spy() };

      Generator.prototype.configuring.fetchUserInfo.call(context);

      Generator.prototype.configuring.fetchUserInfo.should.have.been.called;
      ghGotMock.should.have.been.called;
      context.log.error.should.have.been.called;
      context.props.should.be.deep.equal(
        {
          githubUser: {
            name: 'sampleUser',
            login: 'sampleUser',
            email: '',
            htmlUrl: ''
          }
        }
      );
    });
  });

  describe('setYoRc', function () {
    it('should store `props` object in yo config', function() {
      sinon.spy(Generator.prototype.configuring, 'setYoRc');

      context = {
        config: { set: sinon.spy() },
        props: {}
      };

      Generator.prototype.configuring.setYoRc.call(context);

      Generator.prototype.configuring.setYoRc.should.have.been.called;
      context.config.set.should.have.been.called;
      context.config.set.should.have.been.calledWith('props', context.props);

      Generator.prototype.configuring.setYoRc.restore();
    });
  });

});
