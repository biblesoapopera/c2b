'use strict';

System.register('bso-client/api/lang', [], function (_export, _context) {
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
        var store = {
          en: { name: 'english', loaded: true },
          es: { name: 'español', loaded: false },
          mizo: { name: 'mizo', loaded: false },
          my: { name: 'မြန်မာ', loaded: false }
        };

        return {
          read: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(lang) {
              var data;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (store[lang]) {
                        _context2.next = 2;
                        break;
                      }

                      return _context2.abrupt('return');

                    case 2:
                      if (store[lang].loaded) {
                        _context2.next = 9;
                        break;
                      }

                      _context2.next = 5;
                      return xhr.get('lang/' + lang + '.json');

                    case 5:
                      data = _context2.sent;

                      data.name = store[lang].name;
                      data.loaded = true;
                      store[lang] = data;

                    case 9:
                      return _context2.abrupt('return', store[lang]);

                    case 10:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function read(_x) {
              return _ref.apply(this, arguments);
            };
          }(),
          readSync: function readSync(lang) {
            if (store[lang] && store[lang].loaded) return store[lang];
          },
          listNames: function listNames() {
            return Object.keys(store).map(function (key) {
              return [key, store[key].name];
            });
          }
        };
      });
    }
  };
});