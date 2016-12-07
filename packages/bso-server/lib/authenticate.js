'use strict';

System.register('bso-server/authenticate', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (user, password) {
        if (user === 'test@test.com' && password === 'test123') {
          return true;
        } else {
          return false;
        }
      });
    }
  };
});