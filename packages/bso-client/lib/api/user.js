'use strict';

System.register('bso-client/api/user', [], function (_export, _context) {
  "use strict";

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  return {
    setters: [],
    execute: function () {
      _export('default', function (xhr, jwt) {
        var _active = void 0;

        return {
          login: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username, password) {
              var result;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return xhr.post('/user/login', { username: username, password: password });

                    case 2:
                      result = _context2.sent;

                      if (!(result.status === 500)) {
                        _context2.next = 9;
                        break;
                      }

                      _active = undefined;
                      jwt.remove();
                      throw new Error(result.body.msg);

                    case 9:
                      if (!(result.status !== 200)) {
                        _context2.next = 13;
                        break;
                      }

                      _active = undefined;
                      jwt.remove();
                      return _context2.abrupt('return', false);

                    case 13:

                      _active = result.body;
                      return _context2.abrupt('return', true);

                    case 15:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function login(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }(),
          logout: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
              var result;
              return regeneratorRuntime.wrap(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return xhr.get('/user/logout');

                    case 2:
                      result = _context3.sent;

                      if (!(result.status === 500)) {
                        _context3.next = 7;
                        break;
                      }

                      throw new Error(result.body.msg);

                    case 7:
                      if (!(result.status !== 200)) {
                        _context3.next = 9;
                        break;
                      }

                      return _context3.abrupt('return', false);

                    case 9:

                      jwt.remove();
                      _active = undefined;

                      return _context3.abrupt('return', true);

                    case 12:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee2, undefined);
            }));

            return function logout() {
              return _ref2.apply(this, arguments);
            };
          }(),
          active: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
              var token, result;
              return regeneratorRuntime.wrap(function _callee3$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (_active) {
                        _context4.next = 14;
                        break;
                      }

                      token = jwt.get();

                      if (!token) {
                        _context4.next = 13;
                        break;
                      }

                      _context4.next = 5;
                      return xhr.get('/user/active');

                    case 5:
                      result = _context4.sent;

                      if (!(result.status === 500)) {
                        _context4.next = 10;
                        break;
                      }

                      throw new Error(result.body.msg);

                    case 10:
                      if (result.status === 200) {
                        _active = result.body;
                      } else if (result.status === 401) {
                        jwt.remove();
                        _active = { roles: ['guest'] };
                      }

                    case 11:
                      _context4.next = 14;
                      break;

                    case 13:
                      _active = { roles: ['guest'] };

                    case 14:
                      return _context4.abrupt('return', _active);

                    case 15:
                    case 'end':
                      return _context4.stop();
                  }
                }
              }, _callee3, undefined);
            }));

            return function active() {
              return _ref3.apply(this, arguments);
            };
          }()
        };
      });
    }
  };
});