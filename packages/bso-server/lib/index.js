'use strict';

System.register('bso-server', ['express', './db', './rbac', './config', './router'], function (_export, _context) {
  "use strict";

  var express, dbFn, rbac, config, router, port, app, db, key;
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
      port = 8080;
      app = express();
      db = dbFn(config.dbUrl);
      key = config.jwkKey;


      app.use('/', router(key, rbac, db));

      app.listen(port, function () {
        console.log('c2b app listening on port ' + port);
      });
    }
  };
});