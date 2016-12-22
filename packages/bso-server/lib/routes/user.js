'use strict';

System.register('bso-server/routes/user', ['../api', 'body-parser', '../authenticate'], function (_export, _context) {
  "use strict";

  var api, bodyParser, authenticate;
  return {
    setters: [function (_api) {
      api = _api.default;
    }, function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }, function (_authenticate) {
      authenticate = _authenticate.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.post('/user/login', bodyParser.json(), api.user.login(cfg.key, cfg.db));

        router.get('/user/logout', authenticate(cfg.key, cfg.db), api.user.logout(cfg.db));

        router.get('/user/active', authenticate(cfg.key, cfg.db), api.user.active());
      });
    }
  };
});