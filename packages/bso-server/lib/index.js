'use strict';

System.register('bso-server', ['express', './db', './rbac', './config', './router', './logger'], function (_export, _context) {
  "use strict";

  var express, dbFn, rbac, config, router, logger, app, db, clean;
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
    }, function (_logger) {
      logger = _logger.default;
    }],
    execute: function () {
      app = express();
      db = dbFn(config.dbUrl);


      app.use('/', router({
        key: config.jwkKey,
        rbac: rbac,
        db: db,
        audioDir: config.audioDir,
        logger: logger
      }));

      app.listen(config.port, function () {
        console.log('c2b app listening on port ' + config.port);
      });

      // clear tokens on startup and once a day

      clean = function clean() {
        db.revokedToken.clean();
        setTimeout(clean, 1000 * 60 * 60 * 24);
      };

      clean();
    }
  };
});