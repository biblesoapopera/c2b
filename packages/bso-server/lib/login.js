'use strict';

System.register('bso-server/login', ['jsonwebtoken', 'password-hash'], function (_export, _context) {
    "use strict";

    var jwt, hash, fail;
    return {
        setters: [function (_jsonwebtoken) {
            jwt = _jsonwebtoken.default;
        }, function (_passwordHash) {
            hash = _passwordHash.default;
        }],
        execute: function () {
            fail = function fail(res, next) {
                res.status(401);
                res.type('json');
                res.send({ msg: 'login fail' });
                next('route');
            };

            _export('default', function (key, db) {
                return function (req, res, next) {

                    var username = req.body.username;
                    var password = req.body.password;

                    if (!username || !password) return fail(res, next);

                    var user = db.user.find(username);
                    if (!user) return fail(res, next);

                    if (!hash.verify(password, user.password)) return fail(res, next);

                    var token = jwt.sign({ sub: user.username, name: user.name }, key);
                    res.set('authorization', 'jwt ' + token);
                    res.type('json');
                    res.status(200);
                    res.send({ msg: 'logged in' });

                    req.user = user;
                    next();
                };
            });
        }
    };
});