'use strict';

System.register('bso-server/api/series/readLangPublished', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _asyncToGenerator;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }],
    execute: function () {
      _export('default', function (db) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var result;
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    result = void 0;
                    _context2.next = 3;
                    return db.series.find({ lang: req.params.lang, published: true });

                  case 3:
                    result = _context2.sent;


                    res.type('json');
                    res.status(200);
                    res.send(result);
                    next();

                  case 8:
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