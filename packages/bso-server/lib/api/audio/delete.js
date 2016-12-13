'use strict';

System.register('bso-server/api/audio/delete', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'path', 'del', '../helpers/fail', './helpers/checkFilename'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _asyncToGenerator, path, del, fail, checkFilename;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_path) {
      path = _path.default;
    }, function (_del) {
      del = _del.default;
    }, function (_helpersFail) {
      fail = _helpersFail.default;
    }, function (_helpersCheckFilename) {
      checkFilename = _helpersCheckFilename.default;
    }],
    execute: function () {
      _export('default', function (audioDir, db) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (checkFilename(req, res, next)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 2:
                    _context2.prev = 2;
                    _context2.next = 5;
                    return db.audioHash.delete(req.params.file + '.mp3');

                  case 5:
                    _context2.next = 10;
                    break;

                  case 7:
                    _context2.prev = 7;
                    _context2.t0 = _context2['catch'](2);
                    return _context2.abrupt('return', fail(res, 'file delete error', next));

                  case 10:
                    _context2.prev = 10;
                    _context2.next = 13;
                    return del([path.join(audioDir, req.params.file + '.mp3')]);

                  case 13:
                    _context2.next = 18;
                    break;

                  case 15:
                    _context2.prev = 15;
                    _context2.t1 = _context2['catch'](10);
                    return _context2.abrupt('return', fail(req, 'file delete error', next));

                  case 18:

                    res.type('json');
                    res.status(200);
                    res.send({ msg: 'delete successful' });
                    next();

                  case 22:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined, [[2, 7], [10, 15]]);
          }));

          return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  };
});