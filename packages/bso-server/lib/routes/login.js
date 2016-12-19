'use strict';

System.register('bso-server/routes/login', ['../login', '../logout', 'body-parser', '../authenticate'], function (_export, _context) {
  "use strict";

  var login, logout, bodyParser, authenticate;
  return {
    setters: [function (_login) {
      login = _login.default;
    }, function (_logout) {
      logout = _logout.default;
    }, function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }, function (_authenticate) {
      authenticate = _authenticate.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.post('/login', bodyParser.json(), login(cfg.key, cfg.db));

        router.get('/logout', authenticate(cfg.key, cfg.db), logout(cfg.db));
      });
    }
  };
});