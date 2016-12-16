'use strict';

System.register('bso-server/api/series/update', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', '../helpers/validationFail', 'mongoose'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _asyncToGenerator, validationFail, mongoose;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_helpersValidationFail) {
      validationFail = _helpersValidationFail.default;
    }, function (_mongoose) {
      mongoose = _mongoose.default;
    }],
    execute: function () {
      _export('default', function (db) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var result, seriesObj;
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    result = void 0;
                    seriesObj = req.body;

                    if (!seriesObj.published) {
                      _context2.next = 4;
                      break;
                    }

                    return _context2.abrupt('return', validationFail(res, { errors: { published: { msg: 'Cannot publish a series during update.' } } }, next));

                  case 4:
                    _context2.prev = 4;
                    _context2.next = 7;
                    return db.series.update({ _id: req.params.id, published: false }, seriesObj);

                  case 7:
                    result = _context2.sent;
                    _context2.next = 15;
                    break;

                  case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2['catch'](4);

                    if (!(_context2.t0 instanceof mongoose.Error.ValidationError)) {
                      _context2.next = 14;
                      break;
                    }

                    return _context2.abrupt('return', validationFail(res, _context2.t0, next));

                  case 14:
                    throw _context2.t0;

                  case 15:
                    if (result) {
                      _context2.next = 17;
                      break;
                    }

                    return _context2.abrupt('return', validationFail(res, { errors: { published: { msg: 'Cannot update a published series.' } } }, next));

                  case 17:

                    res.type('json');
                    res.status(200);
                    res.send(result);
                    next();

                  case 21:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined, [[4, 10]]);
          }));

          return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  };
});