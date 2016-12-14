'use strict';

System.register('bso-server/routes/login', ['./login', 'body-parser'], function (_export, _context) {
  "use strict";

  var login, bodyParser;
  return {
    setters: [function (_login) {
      login = _login.default;
    }, function (_bodyParser) {
      bodyParser = _bodyParser.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.post('/login', bodyParser.json(), login(cfg.key, cfg.db));
      });
    }
  };
});