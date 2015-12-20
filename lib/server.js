"use strict";

const th = require('telehash');
const debug = require('debug')('server');

class Server {
  start() {
    th.load({id:"./.tmp/server.json"}, this.onLoadHandler);
  }

  onLoadHandler(err, mesh) {
    if (err) throw err;
    debug("server uri: ", mesh.uri());

    mesh.discover(true);

    mesh.accept = /* istanbul ignore next */ function(sender) {
      debug("INCOMING:", sender.hashname);
      mesh.link(sender)
    };

    mesh.stream( /* istanbul ignore next */ function(sender, args, accept){
      debug("GOT INCOMING STREAM")
      let chan = accept();

      chan.on('data', function (data) {
        data = data.toString();
        debug("ECHO:", data);
        chan.write(data.toUpperCase());
      });
    });
  }
}

module.exports = Server;
