'use strict';

System.register('bso-server/errHandler', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (logger) {
        return function (err, req, res, next) {
          logger(err);

          res.status(500);
          res.type('json');
          res.send({ msg: 'internal server error' });
          next();
        };
      });
    }
  };
});