'use strict';

var mockery = require('mockery');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator-generator writing script', function () {
  var context;

  describe('copyTpl', function () {

    it('should fetch user info on Github API', function() {
      sinon.spy(Generator.prototype.writing, 'copyTpl');
      context = {
        props: {},
        fs: {
          copyTpl: sinon.stub()
        },
        templatePath: sinon.stub().returns('path/of/template'),
        destinationPath: sinon.stub().returns('path/of/destination')
      };

      Generator.prototype.writing.copyTpl.call(context);

      Generator.prototype.writing.copyTpl.should.have.been.called;
      context.props._s.should.be.exist;
      context.fs.copyTpl.should.have.been.calledWith(context.templatePath() + '/**', context.destinationPath(), context.props);

      Generator.prototype.writing.copyTpl.restore();
    });
  });

  describe('move', function () {
    it('should move/rename files', function() {
      sinon.spy(Generator.prototype.writing, 'move');
      context = {
        fs: {
          move: sinon.stub()
        },
        destinationPath: sinon.stub().returns('path/of/destination')
      };

      Generator.prototype.writing.move.call(context);

      Generator.prototype.writing.move.should.have.been.called;
      context.fs.move.should.have.been.called;

      Generator.prototype.writing.move.restore();
    });
  });

});
