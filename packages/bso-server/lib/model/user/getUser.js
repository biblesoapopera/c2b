'use strict';

System.register('bso-server/model/user/getUser', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (username) {
        if (username === 'test@test.com') {
          return {
            id: 1,
            name: 'John Test'
          };
        }
      });
    }
  };
});