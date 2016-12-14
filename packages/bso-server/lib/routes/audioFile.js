'use strict';

System.register('bso-server/routes/audioFile', ['../authenticate', '../authorize', '../api', 'body-parser', 'express-fileupload', '../audioLib'], function (_export, _context) {
  "use strict";

  var authenticate, authorize, api, bodyParser, fileUpload, audioLib;
  return {
    setters: [function (_authenticate) {
      authenticate = _authenticate.default;
    }, function (_authorize) {
      authorize = _authorize.default;
    }, function (_api) {
      api = _api.default;
    }, function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }, function (_expressFileupload) {
      fileUpload = _expressFileupload.default;
    }, function (_audioLib) {
      audioLib = _audioLib.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.put('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'audio'), fileUpload(), api.audio.create(cfg.audioDir));
        router.patch('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'audio'), fileUpload(), api.audio.update(cfg.audioDir));
        router.delete('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'audio'), bodyParser.json(), api.audio.delete(cfg.audioDir));
        router.use('/audio', audioLib(cfg.audioDir));
      });
    }
  };
});