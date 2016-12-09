'use strict';

System.register('bso-server/api/series/readLang', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (db) {
        return function (req, res, next) {
          var series = db.series.find(req.params.lang);
          res.type('json');
          res.status(200);
          res.send(series);
        };
      });
    }
  };
});