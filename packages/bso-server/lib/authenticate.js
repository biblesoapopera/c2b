'use strict';

System.register('bso-server/authenticate', ['jsonwebtoken'], function (_export, _context) {
    "use strict";

    var jwt, fail;
    return {
        setters: [function (_jsonwebtoken) {
            jwt = _jsonwebtoken.default;
        }],
        execute: function () {
            fail = function fail(res, next) {
                res.status(401);
                next('route');
            };

            _export('default', function (key, db) {
                return function (req, res, next) {
                    var authHeader = req.get('authorization');

                    if (!authHeader || authHeader.slice(0, 3) !== 'jwt') return fail(res, next);

                    var token = authHeader.slice(4);
                    var payload = void 0;

                    try {
                        payload = jwt.verify(token, key);
                    } catch (err) {
                        return fail(res, next);
                    }

                    var username = payload.sub;
                    if (!username) return fail(res, next);

                    var user = db.user.find(username);

                    if (!user) return fail(res, next);

                    req.user = user;
                    next();
                };
            });
        }
    };
});