'use strict';

System.register('bso-client/api/series', [], function (_export, _context) {
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
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(lang, number, title) {
              var result;
              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return xhr.post('/series', {
                        lang: lang,
                        number: number,
                        title: title
                      });

                    case 2:
                      result = _context2.sent;

                      if (!(result.status === 500)) {
                        _context2.next = 7;
                        break;
                      }

                      throw new Error(result.body.msg);

                    case 7:
                      if (!(result.status !== 200)) {
                        _context2.next = 9;
                        break;
                      }

                      return _context2.abrupt('return', false);

                    case 9:
                      return _context2.abrupt('return', result.body);

                    case 10:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function create(_x, _x2, _x3) {
              return _ref.apply(this, arguments);
            };
          }(),

          'delete': function _delete() {},
          publish: function publish() {},
          readLangAll: function readLangAll() {},
          readLangPublished: function readLangPublished() {},
          unpublish: function unpublish() {},
          update: function update() {}
        };
      });
    }
  };
});