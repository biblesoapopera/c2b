'use strict';

System.register('bso-server/api/user/login', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'jsonwebtoken', 'password-hash'], function (_export, _context) {
    "use strict";

    var _regeneratorRuntime, _asyncToGenerator, jwt, hash, authenticaionFail;

    return {
        setters: [function (_babelRuntimeRegenerator) {
            _regeneratorRuntime = _babelRuntimeRegenerator.default;
        }, function (_babelRuntimeHelpersAsyncToGenerator) {
            _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
        }, function (_jsonwebtoken) {
            jwt = _jsonwebtoken.default;
        }, function (_passwordHash) {
            hash = _passwordHash.default;
        }],
        execute: function () {
            authenticaionFail = function authenticaionFail(res, next) {
                res.status(401);
                res.type('json');
                res.send({ msg: 'login fail' });
                next('route');
            };

            _export('default', function (key, db) {
                return function () {
                    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
                        var username, password, user, token;
                        return _regeneratorRuntime.wrap(function _callee$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        username = req.body.username;
                                        password = req.body.password;

                                        if (!(!username || !password)) {
                                            _context2.next = 4;
                                            break;
                                        }

                                        return _context2.abrupt('return', authenticaionFail(res, next));

                                    case 4:
                                        user = void 0;
                                        _context2.prev = 5;
                                        _context2.next = 8;
                                        return db.user.find({ username: username });

                                    case 8:
                                        user = _context2.sent;
                                        _context2.next = 14;
                                        break;

                                    case 11:
                                        _context2.prev = 11;
                                        _context2.t0 = _context2['catch'](5);
                                        throw new Error('db.user.find database error. username: ' + username);

                                    case 14:
                                        if (user) {
                                            _context2.next = 16;
                                            break;
                                        }

                                        return _context2.abrupt('return', authenticaionFail(res, next));

                                    case 16:
                                        if (hash.verify(password, user.password)) {
                                            _context2.next = 18;
                                            break;
                                        }

                                        return _context2.abrupt('return', authenticaionFail(res, next));

                                    case 18:
                                        token = jwt.sign({
                                            sub: user.username,
                                            name: user.name,
                                            lv: user.loginVersion,
                                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10 // Expires in ten days
                                        }, key);


                                        res.set('authorization', 'jwt ' + token);
                                        res.type('json');
                                        res.status(200);
                                        res.send({
                                            username: user.username,
                                            name: user.name,
                                            lang: user.lang,
                                            roles: user.roles
                                        });

                                        req.user = user;
                                        next();

                                    case 25:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee, undefined, [[5, 11]]);
                    }));

                    return function (_x, _x2, _x3) {
                        return _ref.apply(this, arguments);
                    };
                }();
            });
        }
    };
});