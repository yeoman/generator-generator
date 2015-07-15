'use strict';

var path = require('path');

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator initializing script', function () {

  describe('defaultName', function () {
    var context = {};

    beforeEach(function() {
      sinon.spy(Generator.prototype.initializing, 'defaultName');
    });

    afterEach(function() {
      Generator.prototype.initializing.defaultName.restore();
    });

    it('should define default `appName` based on cwd if no argument', function() {
      context.appName = undefined;

      Generator.prototype.initializing.defaultName.call(context);

      Generator.prototype.initializing.defaultName.should.have.been.called;
      context.appName.should.be.equal(process.cwd().split(path.sep).pop());
    });
    it('should define default `appName` based on first argument', function() {
      context.appName = 'newApp';

      Generator.prototype.initializing.defaultName.call(context);

      Generator.prototype.initializing.defaultName.should.have.been.called;
      context.appName.should.be.equal('newApp');
    });
  });

});
