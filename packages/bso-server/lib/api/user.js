'use strict';

System.register('bso-server/api/user', ['./user/login', './user/logout', './user/active'], function (_export, _context) {
  "use strict";

  var login, logout, active;
  return {
    setters: [function (_userLogin) {
      login = _userLogin.default;
    }, function (_userLogout) {
      logout = _userLogout.default;
    }, function (_userActive) {
      active = _userActive.default;
    }],
    execute: function () {
      _export('default', {
        login: login,
        logout: logout,
        active: active
      });
    }
  };
});