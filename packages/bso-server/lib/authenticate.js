'use strict';

System.register('bso-server/authenticate', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'jsonwebtoken'], function (_export, _context) {
    "use strict";

    var _regeneratorRuntime, _asyncToGenerator, jwt, fail, updateTokenExpiry;

    return {
        setters: [function (_babelRuntimeRegenerator) {
            _regeneratorRuntime = _babelRuntimeRegenerator.default;
        }, function (_babelRuntimeHelpersAsyncToGenerator) {
            _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
        }, function (_jsonwebtoken) {
            jwt = _jsonwebtoken.default;
        }],
        execute: function () {
            fail = function fail(res, next) {
                res.status(401);
                res.type('json');
                res.send({ msg: 'not authorized' });
                next('route');
            };

            updateTokenExpiry = function updateTokenExpiry(payload, user, key, res) {
                if (payload.exp < Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 8) {
                    var token = jwt.sign({
                        sub: user.username,
                        name: user.name,
                        lv: user.loginVersion,
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10 // Expires in ten days
                    }, key);
                    res.set('authorization', 'jwt ' + token);
                }
            };

            _export('default', function (key, db) {
                return function () {
                    var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
                        var authHeader, token, payload, user;
                        return _regeneratorRuntime.wrap(function _callee$(_context2) {
                            while (1) {
                                switch (_context2.prev = _context2.next) {
                                    case 0:
                                        authHeader = req.get('authorization');

                                        // not authentication attempted. identify as guest

                                        if (authHeader) {
                                            _context2.next = 5;
                                            break;
                                        }

                                        req.user = { roles: ['guest'] };
                                        next();
                                        return _context2.abrupt('return');

                                    case 5:
                                        if (!(authHeader.slice(0, 3) !== 'jwt')) {
                                            _context2.next = 7;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 7:
                                        token = authHeader.slice(4);

                                        // check token not revoked

                                        _context2.next = 10;
                                        return db.revokedToken.exists(token);

                                    case 10:
                                        if (!_context2.sent) {
                                            _context2.next = 12;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 12:
                                        payload = void 0;
                                        _context2.prev = 13;

                                        // check signature and expiry
                                        payload = jwt.verify(token, key);
                                        _context2.next = 20;
                                        break;

                                    case 17:
                                        _context2.prev = 17;
                                        _context2.t0 = _context2['catch'](13);
                                        return _context2.abrupt('return', fail(res, next));

                                    case 20:
                                        if (!(!payload.exp || !payload.sub || !payload.lv)) {
                                            _context2.next = 22;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 22:
                                        _context2.next = 24;
                                        return db.user.find({ username: payload.sub });

                                    case 24:
                                        user = _context2.sent;

                                        if (user) {
                                            _context2.next = 27;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 27:
                                        if (!(payload.lv !== user.loginVersion)) {
                                            _context2.next = 29;
                                            break;
                                        }

                                        return _context2.abrupt('return', fail(res, next));

                                    case 29:

                                        // all checks complete. token good.

                                        // update token expiry if token will expire in less than eight days
                                        updateTokenExpiry(payload, user, key, res);

                                        req.user = user;
                                        req.token = {
                                            value: token,
                                            payload: payload
                                        };

                                        next();

                                    case 33:
                                    case 'end':
                                        return _context2.stop();
                                }
                            }
                        }, _callee, undefined, [[13, 17]]);
                    }));

                    return function (_x, _x2, _x3) {
                        return _ref.apply(this, arguments);
                    };
                }();
            });
        }
    };
});