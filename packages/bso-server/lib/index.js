'use strict';

System.register('bso-server', ['express', './static', './login', './jwt-key'], function (_export, _context) {
  "use strict";

  var express, staticAssets, login, key, port, app;
  return {
    setters: [function (_express) {
      express = _express.default;
    }, function (_static) {
      staticAssets = _static.default;
    }, function (_login) {
      login = _login.default;
    }, function (_jwtKey) {
      key = _jwtKey.default;
    }],
    execute: function () {
      port = 8080;
      app = express();


      login(app, key);
      staticAssets(app);

      app.listen(port, function () {
        console.log('Example app listening on port ' + port);
      });
    }
  };
});