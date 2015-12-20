"use strict";

let chai       = require('chai');
let assert     = chai.assert;
let sinon      = require('sinon');
let mocks      = require('../../support/mocks');
let proxyquire = require('proxyquire').noCallThru();

let proxyTelehash = {
  load: function() {}
};

let serverStubs = {
  'telehash': proxyTelehash
};

describe('server', function() {
  let Server = proxyquire('../../../lib/server', serverStubs);
  let server = new Server();

  describe('start', function() {
    beforeEach(function() {
      sinon.spy(proxyTelehash, 'load');
      server.start()
    });

    afterEach(function() {
      proxyTelehash.load.restore();
    });

    it('calls load', function() {
      assert.isTrue(proxyTelehash.load.calledOnce);
    })
  });

  describe('onLoadHandler', function() {
    let mesh = mocks.mesh;
    describe('given an error', function() {
      it('throws an error', function() {
        assert.throws(function() {
          server.onLoadHandler(mocks.err, null);
        });
      })
    });

    describe('given a mesh', function() {
      beforeEach(function() {
        sinon.spy(mesh, 'discover');
        sinon.spy(mesh, 'stream');
        server.onLoadHandler(null, mesh)
      });

      afterEach(function() {
        mesh.discover.restore();
        mesh.stream.restore();
      })

      it('calls mesh.discover', function() {
        assert.isTrue(mesh.discover.calledOnce);
      })

      it('calls mesh.stream', function() {
        assert.isTrue(mesh.stream.calledOnce);
      })
    });
  });
});
