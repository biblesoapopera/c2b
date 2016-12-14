'use strict';

System.register('bso-server/routes/series', ['./authenticate', './authorize', './api', 'body-parser'], function (_export, _context) {
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
        router.get('/series/:lang/all', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'readAll', 'series'), api.series.readLangAll(cfg.db));
        router.get('/series/:lang/published', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'readPublished', 'series'), api.series.readLangPublished(cfg.db));
        router.put('/series', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'series'), bodyParser.json(), api.series.create(cfg.db));
        router.delete('/series/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'series'), api.series.delete(cfg.db));
        router.patch('/series/:id/publish', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'publish', 'series'), bodyParser.json(), api.series.publish(cfg.db));
        router.patch('/series/:id/unpublish', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'unpublish', 'series'), bodyParser.json(), api.series.unpublish(cfg.db));
        router.patch('/series/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'series'), bodyParser.json(), api.series.update(cfg.db));
      });
    }
  };
});