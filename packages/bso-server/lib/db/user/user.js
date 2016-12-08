'use strict';

System.register('bso-server/db/user/user', ['./find'], function (_export, _context) {
  "use strict";

  var find;
  return {
    setters: [function (_find) {
      find = _find.default;
    }],
    execute: function () {
      _export('default', {
        find: find
      });
    }
  };
});