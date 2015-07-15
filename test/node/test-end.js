'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator-yeoman-generator end script', function () {
  var context;

  it('should print a end message', function() {
    sinon.spy(Generator.prototype, 'end');
    context = {
      log: sinon.stub()
    };

    Generator.prototype.end.call(context);

    Generator.prototype.end.should.have.been.called;
    context.log.should.have.been.called;

    Generator.prototype.end.restore();
  });
});
