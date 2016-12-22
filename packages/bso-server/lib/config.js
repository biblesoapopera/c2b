'use strict';

System.register('bso-server/config', ['path', './db', './rbac', './logger'], function (_export, _context) {
  "use strict";

  var path, db, rbac, logger;
  return {
    setters: [function (_path) {
      path = _path.default;
    }, function (_db) {
      db = _db.default;
    }, function (_rbac) {
      rbac = _rbac.default;
    }, function (_logger) {
      logger = _logger.default;
    }],
    execute: function () {
      _export('default', {
        key: 'D3zXfkA157ISE3i7S74YUF3qFcY0sicn',
        rbac: rbac,
        db: db('mongodb://localhost:27017/c2b'),
        audioData: path.join(__dirname, '..', '..', '..', 'data', 'audio'),
        langData: path.join(__dirname, '..', '..', '..', 'data', 'lang'),
        episodeImgData: path.join(__dirname, '..', '..', '..', 'data', 'episode-img'),
        port: 8080,
        logger: logger
      });
    }
  };
});