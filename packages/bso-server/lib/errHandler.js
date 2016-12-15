'use strict';

System.register('bso-server/errHandler', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function () {
        return function (err, req, res, next) {
          // TODO log to server log file
          var log = err;

          res.status(500);
          res.type('json');
          res.send({ msg: 'internal server error' });
          next();
        };
      });
    }
  };
});