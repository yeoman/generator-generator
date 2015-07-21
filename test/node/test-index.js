'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var yeoman = require('yeoman-generator');

var Generator = require('../../app/index.js');

describe('generator-yeoman-generator index script', function () {

  beforeEach(function() {
    sinon.stub(yeoman.generators.Base, 'apply');
  });

  afterEach(function() {
    yeoman.generators.Base.apply.restore();
  });

  describe('constructor', function () {
    var context = {
      argument: sinon.stub(),
      log: sinon.spy()
    };
    it('should parse first argument ̀`generatorName`', function() {
      Generator.prototype.constructor.call(context);

      yeoman.generators.Base.apply.should.have.been.called;
      context.argument.should.have.been.called;
    });
    it('should init `props` object with current package version', function() {
      Generator.prototype.constructor.call(context);

      yeoman.generators.Base.apply.should.have.been.called;
      context.props.should.be.deep.equal({version: require('../../package.json').version});
    });
    it('should print YoSay message', function() {
      Generator.prototype.constructor.call(context);

      yeoman.generators.Base.apply.should.have.been.called;
      context.log.should.have.been.called;
    });
  });

});
