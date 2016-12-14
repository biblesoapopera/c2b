'use strict';

System.register('bso-server/routes/episode', ['./authenticate', './authorize', './api', 'body-parser'], function (_export, _context) {
  "use strict";

  var authenticate, authorize, api, bodyParser;
  return {
    setters: [function (_authenticate) {
      authenticate = _authenticate.default;
    }, function (_authorize) {
      authorize = _authorize.default;
    }, function (_api) {
      api = _api.default;
    }, function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.get('/episode/orphan', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'readOrphan', 'episode'), api.episode.readOrphan(cfg.db));
        router.get('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'read', 'episode'), api.episode.readId(cfg.db));
        router.put('/episode', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'episode'), bodyParser.json(), api.episode.create(cfg.db));
        router.patch('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'episode'), bodyParser.json(), api.episode.update(cfg.db));
        router.delete('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'episode'), api.episode.delete(cfg.db));
      });
    }
  };
});