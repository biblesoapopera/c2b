'use strict';

System.register('bso-server', ['./config', './server'], function (_export, _context) {
  "use strict";

  var config, server;
  return {
    setters: [function (_config) {
      config = _config.default;
    }, function (_server) {
      server = _server.default;
    }],
    execute: function () {

      server.start(config);
    }
  };
});