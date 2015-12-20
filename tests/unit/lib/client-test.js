"use strict";

let chai       = require('chai');
let assert     = chai.assert;
let sinon      = require('sinon');
let mocks      = require('../../support/mocks');
let proxyquire = require('proxyquire').noCallThru();

let proxyTelehash = {
  load: function() {}
};

let clientStubs = {
  'telehash': proxyTelehash
};

describe('client', function() {
  // let client = require('../../../lib/client');
  let Client = proxyquire('../../../lib/client', clientStubs);
  let client = new Client();

  describe('start', function() {
    beforeEach(function() {
      sinon.spy(proxyTelehash, 'load');
      client.start()
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
          client.onLoadHandler(mocks.err, null);
        });
      })
    });

    describe('given a mesh', function() {
      beforeEach(function() {
        sinon.spy(mesh, 'discover');
        client.onLoadHandler(null, mesh)
      });

      afterEach(function() {
        mesh.discover.restore();
      })

      it('calls mesh.discover', function() {
        assert.isTrue(mesh.discover.calledOnce);
      })
    });
  });
});
