'use strict';

System.register('bso-server/authenticate', ['jsonwebtoken'], function (_export, _context) {
    "use strict";

    var jwt;
    return {
        setters: [function (_jsonwebtoken) {
            jwt = _jsonwebtoken.default;
        }],
        execute: function () {
            _export('default', function (key, db) {
                return function (req, res, next) {
                    var authHeader = req.get('authorization');

                    if (authHeader.slice(0, 3) !== 'jwt') {
                        res.status(401);
                        next('route');
                        return;
                    }

                    var token = authHeader.slice(4);
                    var payload = void 0;

                    try {
                        payload = jwt.verify(token, key);
                    } catch (err) {
                        res.status(401);
                        next('route');
                        return;
                    }

                    var username = payload.sub;

                    var user = db.user.find(username);

                    if (!user) {
                        res.status(401);
                        next('route');
                        return;
                    }

                    req.user = user;
                    next();
                };
            });
        }
    };
});