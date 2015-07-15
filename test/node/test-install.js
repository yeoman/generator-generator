'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator-generator install script', function () {
  var context;

  it('should install dependencies', function() {
    sinon.spy(Generator.prototype, 'install');
    context = {
      installDependencies: sinon.stub()
    };

    Generator.prototype.install.call(context);

    Generator.prototype.install.should.have.been.called;
    context.installDependencies.should.have.been.called;

    Generator.prototype.install.restore();
  });
});
