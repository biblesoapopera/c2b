'use strict';

System.register('bso-server/routes/audioData', ['../authenticate', '../authorize', '../api', 'body-parser', 'express-fileupload', '../audioData'], function (_export, _context) {
  "use strict";

  var authenticate, authorize, api, bodyParser, fileUpload, audioData;
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
    }, function (_audioData) {
      audioData = _audioData.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.put('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'audio'), fileUpload(), api.audio.create(cfg.audioData));
        router.patch('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'audio'), fileUpload(), api.audio.update(cfg.audioData));
        router.delete('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'audio'), bodyParser.json(), api.audio.delete(cfg.audioData));
        router.use('/audio', audioData(cfg.audioData));
      });
    }
  };
});