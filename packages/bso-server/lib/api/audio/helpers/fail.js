'use strict';

System.register('bso-server/api/audio/helpers/fail', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (res, msg, next) {
        res.status(500);
        res.type('json');
        res.send({ msg: msg });
        next('route');
        return;
      });
    }
  };
});