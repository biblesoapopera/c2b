'use strict';

System.register('bso-server/db/user', ['./user/find'], function (_export, _context) {
  "use strict";

  var find;
  return {
    setters: [function (_userFind) {
      find = _userFind.default;
    }],
    execute: function () {
      _export('default', {
        find: find
      });
    }
  };
});