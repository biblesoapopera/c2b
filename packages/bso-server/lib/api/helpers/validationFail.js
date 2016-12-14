'use strict';

System.register('bso-server/api/helpers/validationFail', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (res, err, next) {
        res.status(401);
        res.type('json');
        res.send({ errors: err.errors });
        next('route');
        return;
      });
    }
  };
});