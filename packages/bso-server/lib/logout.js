'use strict';

System.register('bso-server/logout', ['jsonwebtoken', 'password-hash', './api/helpers/fail'], function (_export, _context) {
    "use strict";

    var jwt, hash, fail;
    return {
        setters: [function (_jsonwebtoken) {
            jwt = _jsonwebtoken.default;
        }, function (_passwordHash) {
            hash = _passwordHash.default;
        }, function (_apiHelpersFail) {
            fail = _apiHelpersFail.default;
        }],
        execute: function () {}
    };
});