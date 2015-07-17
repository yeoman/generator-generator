'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);

var Generator = require('../../app/index.js');

describe('generator-yeoman-generator configuring script', function () {
  var context = {
    async: function () { return function () {}; }
  };

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
