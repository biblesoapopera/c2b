'use strict';

System.register('bso-server/db/user/find', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (username) {
        if (username === 'test@test.com') {
          return {
            username: 'test@test.com',
            name: 'John Test',
            password: 'test123',
            locale: 'en-au',
            lang: 'en',
            roles: ['student']
          };
        }
      });
    }
  };
});