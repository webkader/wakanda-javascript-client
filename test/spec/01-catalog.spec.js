var isBrowser = new Function("try { return this === window; } catch(e) { return false; }");
if (!isBrowser()) {
  var chai = require('chai');
  var expect = chai.expect;

  var testEnv = process.env.TEST_ENV || 'unit';
  var serverInfo = require('../server.' + testEnv + '.json');

  var wakjsc = require('../../build/wakjsc.node.js');
  var WakJSC = new wakjsc(serverInfo.host + ':' + serverInfo.port);
}

describe('Catalog API', function() {

  describe('get method', function() {
    it('should be defined', function() {
      expect(WakJSC.catalog.get).to.be.a('function');
    });

    it('should return a promise', function () {
      var getCall = WakJSC.catalog.get();
      expect(getCall).to.be.defined;
      expect(getCall.then).to.be.a('function');
      expect(getCall.catch).to.be.a('function');
    });

    it('should provide an object to promise callback', function () {
      return WakJSC.catalog.get().then(function (ds) {
        expect(ds).to.be.an('object');
      });
    });

    it('should retrieve all dataclasses without given parameter', function () {
      return WakJSC.catalog.get().then(function (ds) {
        expect(ds.Company).to.be.an('object');
        expect(ds.Employee).to.be.an('object');
        expect(ds.Product).to.be.an('object');
      });
    });

    it('should retrieve only given dataclasses', function () {
      return WakJSC.catalog.get(['Employee', 'Company']).then(function (ds) {
        expect(ds.Company).to.be.an('object');
        expect(ds.Employee).to.be.an('object');
        expect(ds.Product).to.be.undefined;
      });
    });

    it('should fail trying to retrieve a unknown dataclass', function () {
      return WakJSC.catalog.get(['Foo']).catch(function (e) {
        expect(e).to.be.defined;
      });
    });

    it('should fail if given parameter is not an array', function () {
      try {
        WakJSC.catalog.get('Foo')
      }
      catch (e) {
        expect(e).to.be.defined;
      }
    });
  });
});
