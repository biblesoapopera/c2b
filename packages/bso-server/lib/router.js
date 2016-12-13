'use strict';

System.register('bso-server/router', ['./static', './login', 'body-parser', './api', './err', './authenticate', './authorize', 'express', 'express-fileupload'], function (_export, _context) {
  "use strict";

  var staticAssets, login, bodyParser, api, err, authenticate, authorize, express, fileUpload;
  return {
    setters: [function (_static) {
      staticAssets = _static.default;
    }, function (_login) {
      login = _login.default;
    }, function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }, function (_api) {
      api = _api.default;
    }, function (_err) {
      err = _err.default;
    }, function (_authenticate) {
      authenticate = _authenticate.default;
    }, function (_authorize) {
      authorize = _authorize.default;
    }, function (_express) {
      express = _express.default;
    }, function (_expressFileupload) {
      fileUpload = _expressFileupload.default;
    }],
    execute: function () {
      _export('default', function (cfg) {
        var router = express.Router();

        router.post('/login', bodyParser.json(), login(cfg.key, cfg.db));

        router.get('/series/:lang', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'read', 'series'), api.series.readLang(cfg.db));

        router.get('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'read', 'episode'), api.episode.readId(cfg.db));
        router.put('/episode', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'episode'), bodyParser.json(), api.episode.create(cfg.db));
        router.patch('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'episode'), bodyParser.json(), api.episode.update(cfg.db));
        router.delete('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'episode'), api.episode.delete(cfg.db));

        router.put('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'audio'), fileUpload(), api.audio.create(cfg.audioDir));
        router.patch('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'audio'), fileUpload(), api.audio.update(cfg.audioDir));
        router.delete('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'audio'), bodyParser.json(), api.audio.delete(cfg.audioDir));

        router.use(audioLib());
        router.use(staticAssets());
        router.use(err());

        return router;
      });
    }
  };
});