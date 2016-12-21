'use strict';

System.register('bso-client/jwt', [], function (_export, _context) {
  "use strict";

  var jwt;
  return {
    setters: [],
    execute: function () {
      jwt = void 0;

      _export('default', {
        remove: function remove() {
          localStorage.removeItem('jwt');
          jwt = undefined;
        },
        get: function get() {
          if (!jwt) {
            jwt = localStorage.getItem('jwt');
          }
          return jwt;
        },
        set: function set(newJwt) {
          if (newJwt !== jwt) {
            jwt = newJwt;
            localStorage.setItem('jwt', jwt);
          }
        }
      });
    }
  };
});