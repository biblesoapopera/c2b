'use strict';

System.register('bso-client/api/login', [], function (_export, _context) {
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
      _export('default', function (xhr) {
        return function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(username, password) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return xhr.post('/login', { username: username, password: password });

                  case 2:
                    result = _context2.sent;

                  case 3:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  };
});