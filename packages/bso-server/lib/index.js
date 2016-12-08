'use strict';

System.register('bso-server', ['express', './static', './login', './api/series/getSeries', './err', './jwt-key', './db', './rbac'], function (_export, _context) {
  "use strict";

  var express, staticAssets, login, getSeries, err, key, db, rbac, port, app;
  return {
    setters: [function (_express) {
      express = _express.default;
    }, function (_static) {
      staticAssets = _static.default;
    }, function (_login) {
      login = _login.default;
    }, function (_apiSeriesGetSeries) {
      getSeries = _apiSeriesGetSeries.default;
    }, function (_err) {
      err = _err.default;
    }, function (_jwtKey) {
      key = _jwtKey.default;
    }, function (_db) {
      db = _db.default;
    }, function (_rbac) {
      rbac = _rbac.default;
    }],
    execute: function () {
      port = 8080;
      app = express();


      login(app, key, db);
      getSeries(app, key, rbac, db);
      staticAssets(app);
      err(app);

      app.listen(port, function () {
        console.log('c2b app listening on port ' + port);
      });
    }
  };
});