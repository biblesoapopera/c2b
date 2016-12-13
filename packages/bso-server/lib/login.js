'use strict';

System.register('bso-server/login', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'jsonwebtoken', 'password-hash'], function (_export, _context) {
    "use strict";

    var _regeneratorRuntime, _asyncToGenerator, jwt, hash, fail;

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
            fail = function fail(res, next) {
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

                                        return _context2.abrupt('return', fail(res, next));

                                    case 4:
                                        _context2.next = 6;
                                        return db.user.find(username);

                                    case 6:
                                        user = _context2.sent;

                                        if (user) {
                                            _context2.next = 9;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 9:
                                        if (hash.verify(password, user.password)) {
                                            _context2.next = 11;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 11:
                                        token = jwt.sign({ sub: user.username, name: user.name }, key);

                                        res.set('authorization', 'jwt ' + token);
                                        res.type('json');
                                        res.status(200);
                                        res.send({ msg: 'logged in' });

                                        req.user = user;
                                        next();

                                    case 18:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee, undefined);
                    }));

                    return function (_x, _x2, _x3) {
                        return _ref.apply(this, arguments);
                    };
                }();
            });
        }
    };
});