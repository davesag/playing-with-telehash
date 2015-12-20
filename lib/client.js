"use strict";

const th = require('telehash');
const debug = require('debug')('client');

class Client {
  start() {
    th.load({id: "./.tmp/client." + Date.now() + ".json"}, this.onLoadHandler);
  }
  
  onLoadHandler(err, mesh) {
    if (err) throw err;
    debug("client uri: ", mesh.uri());

    mesh.discover(true);

    mesh.accept =  /* istanbul ignore next */ function(sender) {
      debug("INCOMING:", sender.hashname);
      var link = mesh.link(sender);

      link.on('status', function(up){
        debug("link status", up);

        // only the echo server has a mesh.stream handler, so all client discoveries will drop
        let chan = link.stream();
        chan.write("Hello?");
        let i = 0;

        setInterval(function () {
          chan.write(mesh.hashname.substr(0,8) + ": Test #" + (++i));
        }, 5e3);

        chan.on('data', function (data) {
          debug("DATA:", data.toString());
        });
      })
    };
  }
}

module.exports = Client;
