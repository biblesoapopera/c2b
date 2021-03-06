'use strict';

System.register('bso-server/api/episodeImg/update', ['babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'path', './helpers/checkFile', '../helpers/checkFilename', './helpers/checkMime'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _Promise, _asyncToGenerator, path, checkFile, checkFilename, checkMime;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_path) {
      path = _path.default;
    }, function (_helpersCheckFile) {
      checkFile = _helpersCheckFile.default;
    }, function (_helpersCheckFilename) {
      checkFilename = _helpersCheckFilename.default;
    }, function (_helpersCheckMime) {
      checkMime = _helpersCheckMime.default;
    }],
    execute: function () {
      _export('default', function (episodeImgDir) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var file;
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (checkFile(req)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 2:
                    if (checkFilename(req)) {
                      _context2.next = 4;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 4:
                    if (checkMime(req)) {
                      _context2.next = 6;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 6:
                    file = req.files.img;

                    // save file

                    _context2.next = 9;
                    return new _Promise(function (resolve, reject) {
                      file.mv(path.join(episodeImgDir, req.params.file + '.jpeg'), function (err) {
                        if (err) reject(err);else resolve();
                      });
                    });

                  case 9:

                    res.type('json');
                    res.status(200);
                    res.send({ msg: 'update successful' });
                    next();

                  case 13:
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