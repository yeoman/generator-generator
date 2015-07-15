'use strict';

var path = require('path');

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator-generator initializing script', function () {

  describe('defaultName', function () {
    var context = {};

    beforeEach(function() {
      sinon.spy(Generator.prototype.initializing, 'defaultName');
    });

    afterEach(function() {
      Generator.prototype.initializing.defaultName.restore();
    });

    it('`generatorName` slurp the base name "generator-"', function() {
      context.generatorName = 'generator-temp';

      Generator.prototype.initializing.defaultName.call(context);

      Generator.prototype.initializing.defaultName.should.have.been.called;
      context.generatorName.should.be.equal('temp');
    });
    it('`generatorName` can be "generator-"', function() {
      context.generatorName = 'generator-';

      Generator.prototype.initializing.defaultName.call(context);

      Generator.prototype.initializing.defaultName.should.have.been.called;
      context.generatorName.should.be.equal('generator-');
    });
    it('should define default `generatorName` based on cwd if no argument', function() {
      context.generatorName = undefined;

      Generator.prototype.initializing.defaultName.call(context);

      Generator.prototype.initializing.defaultName.should.have.been.called;
      context.generatorName.should.be.equal(process.cwd().split(path.sep).pop().replace('generator-', ''));
    });
    it('should define default `generatorName` based on first argument', function() {
      context.generatorName = 'temp-generator';

      Generator.prototype.initializing.defaultName.call(context);

      Generator.prototype.initializing.defaultName.should.have.been.called;
      context.generatorName.should.be.equal('temp-generator');
    });
  });

});
