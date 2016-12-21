'use strict';

System.register('bso-client/api', ['./api/user'], function (_export, _context) {
  "use strict";

  var userFn;
  return {
    setters: [function (_apiUser) {
      userFn = _apiUser.default;
    }],
    execute: function () {
      _export('default', function (xhr) {
        var user = userFn(xhr);
        return {
          login: user.login,
          user: user
        };
      });
    }
  };
});