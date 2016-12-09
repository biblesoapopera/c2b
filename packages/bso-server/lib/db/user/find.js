'use strict';

System.register('bso-server/db/user/find', ['password-hash'], function (_export, _context) {
  "use strict";

  var hash;
  return {
    setters: [function (_passwordHash) {
      hash = _passwordHash.default;
    }],
    execute: function () {
      _export('default', function (url) {
        return function (username) {
          if (username === 'test@test.com') {
            return {
              username: 'test@test.com',
              name: 'John Test',
              password: hash.generate('test123'),
              locale: 'en-au',
              lang: 'en',
              roles: ['student']
            };
          }
        };
      });
    }
  };
});