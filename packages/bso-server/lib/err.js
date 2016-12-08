'use strict';

System.register('bso-server/err', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (app) {
        app.use(function (err, req, res, next) {
          console.log(err.stack);
          res.status(500);
          res.send('Internal server error');
        });
      });
    }
  };
});