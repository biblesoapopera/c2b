'use strict';

System.register('bso-client/stores/lang', ['../xhr'], function (_export, _context) {
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
    }],
    execute: function () {
      store = {
        en: { name: 'english', loaded: true },
        es: { name: 'español', loaded: false },
        mizo: { name: 'mizo', loaded: false },
        my: { name: 'မြန်မာ', loaded: false }
      };

      _export('default', {
        load: function load(lang) {
          return new Promise(function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
              var data;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (store[lang].loaded) {
                        _context2.next = 10;
                        break;
                      }

                      _context2.next = 3;
                      return xhr('store/lang/' + lang + '.json');

                    case 3:
                      data = _context2.sent;

                      data.name = store[lang].name;
                      data.loaded = true;
                      store[lang] = data;
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
        },
        find: function find(lang) {
          if (!store[lang] || !store[lang].loaded) return;
          return store[lang];
        }
      });
    }
  };
});