'use strict';

System.register('bso-server/api/series/delete', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', '../helpers/fail', '../helpers/validationFail'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _asyncToGenerator, fail, validationFail;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_helpersFail) {
      fail = _helpersFail.default;
    }, function (_helpersValidationFail) {
      validationFail = _helpersValidationFail.default;
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
                    _context2.prev = 1;
                    _context2.next = 4;
                    return db.series.delete({ _id: req.params.id, published: false });

                  case 4:
                    result = _context2.sent;
                    _context2.next = 10;
                    break;

                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2['catch'](1);
                    return _context2.abrupt('return', fail(res, 'database error', next));

                  case 10:
                    if (result) {
                      _context2.next = 12;
                      break;
                    }

                    return _context2.abrupt('return', validationFail(res, { errors: { published: { msg: 'Unpublish series before deletion' } } }, next));

                  case 12:

                    res.type('json');
                    res.status(200);
                    res.send(result);
                    next();

                  case 16:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined, [[1, 7]]);
          }));

          return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  };
});