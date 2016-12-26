'use strict';

System.register('bso-client/api/episode', [], function (_export, _context) {
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
        return {
          create: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function create() {
              return _ref.apply(this, arguments);
            };
          }(),
          'delete': function _delete() {},
          readId: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
              return regeneratorRuntime.wrap(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return xhr.get('/episode/' + id);

                    case 2:
                      return _context3.abrupt('return', _context3.sent);

                    case 3:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee2, undefined);
            }));

            return function readId(_x) {
              return _ref2.apply(this, arguments);
            };
          }(),
          update: function update() {}
        };
      });
    }
  };
});