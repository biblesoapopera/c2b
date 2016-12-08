'use strict';

System.register('bso-server/api/series/getSeries', ['../../authorize', '../../authenticate'], function (_export, _context) {
  "use strict";

  var authorize, authenticate;
  return {
    setters: [function (_authorize) {
      authorize = _authorize.default;
    }, function (_authenticate) {
      authenticate = _authenticate.default;
    }],
    execute: function () {
      _export('default', function (app, key, rbac, db) {
        app.get('/series/:lang', authenticate(key, db), authorize(rbac, 'read', 'series'), function (req, res) {
          var series = db.series.find(req.params.lang);
          res.type('json');
          res.status(200);
          res.send(series);
        });
      });
    }
  };
});