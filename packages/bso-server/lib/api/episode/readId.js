'use strict';

System.register('bso-server/api/episode/readId', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (db) {
        return function (req, res, next) {
          var episode = db.series.find(req.params.id);
          res.type('json');
          res.status(200);
          res.send(episode);
        };
      });
    }
  };
});