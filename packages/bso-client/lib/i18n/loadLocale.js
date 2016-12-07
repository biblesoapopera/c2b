'use strict';

System.register('bso-client/i18n/loadLocale', ['../xhr', './store'], function (_export, _context) {
  "use strict";

  var xhr, store;

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
    setters: [function (_xhr) {
      xhr = _xhr.default;
    }, function (_store) {
      store = _store.default;
    }],
    execute: function () {
      _export('default', function (locale) {
        return new Promise(function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
            var data;
            return regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (store[locale].loaded) {
                      _context2.next = 10;
                      break;
                    }

                    _context2.next = 3;
                    return xhr('i18n/locale/' + locale + '.json');

                  case 3:
                    data = _context2.sent;

                    data.name = store[locale].name;
                    data.loaded = true;
                    store[locale] = data;
                    resolve();
                    _context2.next = 11;
                    break;

                  case 10:
                    resolve();

                  case 11:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }
  };
});