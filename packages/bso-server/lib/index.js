'use strict';

System.register('bso-server', ['express', './db', './rbac', './config', './router'], function (_export, _context) {
  "use strict";

  var express, dbFn, rbac, config, router, app;
  return {
    setters: [function (_express) {
      express = _express.default;
    }, function (_db) {
      dbFn = _db.default;
    }, function (_rbac) {
      rbac = _rbac.default;
    }, function (_config) {
      config = _config.default;
    }, function (_router) {
      router = _router.default;
    }],
    execute: function () {
      app = express();


      app.use('/', router({
        key: config.jwkKey,
        rbac: rbac,
        db: dbFn(config.dbUrl),
        audioDir: config.audioDir
      }));

      app.listen(config.port, function () {
        console.log('c2b app listening on port ' + config.port);
      });
    }
  };
});