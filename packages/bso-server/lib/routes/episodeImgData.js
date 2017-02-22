'use strict';

System.register('bso-server/routes/episodeImgData', ['../authenticate', '../authorize', '../api', 'body-parser', 'express-fileupload', 'express'], function (_export, _context) {
  "use strict";

  var authenticate, authorize, api, bodyParser, fileUpload, express;
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
    }, function (_express) {
      express = _express.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.put('/episode-img/:lang/:series/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'episode-img'), fileUpload(), api.episodeImg.create(cfg.episodeImgData));
        router.patch('/episode-img/:lang/:series/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'episode-img'), fileUpload(), api.episodeImg.update(cfg.episodeImgData));
        router.delete('/episode-img/:lang/:series/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'episode-img'), bodyParser.json(), api.episodeImg.delete(cfg.episodeImgData));
        router.use('/episode-img', express.static(cfg.episodeImgData));
      });
    }
  };
});