'use strict';

System.register('bso-server/router', ['./static', './login', 'body-parser', './api', './err', './authenticate', './authorize', 'express'], function (_export, _context) {
  "use strict";

  var staticAssets, login, bodyParser, api, err, authenticate, authorize, express;
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
    }],
    execute: function () {
      _export('default', function (key, rbac, db) {
        var router = express.Router();

        router.post('/login', bodyParser.json(), login(key, db));

        router.get('/series/:lang', authenticate(key, db), authorize(rbac, 'read', 'series'), api.series.readLang(db));

        router.get('/episode/:id', authenticate(key, db), authorize(rbac, 'read', 'episode'), api.episode.readId(db));

        router.use(staticAssets());
        router.use(err());

        return router;
      });
    }
  };
});