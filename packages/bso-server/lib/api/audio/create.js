'use strict';

System.register('bso-server/api/audio/create', ['babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', 'path', 'crypto', '../helpers/fail', './helpers/checkFile', './helpers/checkFilename', './helpers/checkMime'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _Promise, _asyncToGenerator, path, crypto, fail, checkFile, checkFilename, checkMime;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_path) {
      path = _path.default;
    }, function (_crypto) {
      crypto = _crypto.default;
    }, function (_helpersFail) {
      fail = _helpersFail.default;
    }, function (_helpersCheckFile) {
      checkFile = _helpersCheckFile.default;
    }, function (_helpersCheckFilename) {
      checkFilename = _helpersCheckFilename.default;
    }, function (_helpersCheckMime) {
      checkMime = _helpersCheckMime.default;
    }],
    execute: function () {
      _export('default', function (audioDir, db) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var file, hash;
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (checkFile(req, res, next)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 2:
                    if (checkFilename(req, res, next)) {
                      _context2.next = 4;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 4:
                    if (checkMime(req, res, next)) {
                      _context2.next = 6;
                      break;
                    }

                    return _context2.abrupt('return');

                  case 6:
                    file = req.files.audio;

                    // save hash

                    hash = crypto.createHash('sha256');
                    _context2.prev = 8;
                    _context2.next = 11;
                    return db.audioHash.create(req.params.file + '.mp3', hash.update(file.data).digest('base64'));

                  case 11:
                    _context2.next = 16;
                    break;

                  case 13:
                    _context2.prev = 13;
                    _context2.t0 = _context2['catch'](8);
                    return _context2.abrupt('return', fail(res, 'file name already taken', next));

                  case 16:
                    _context2.prev = 16;
                    _context2.next = 19;
                    return new _Promise(function (resolve, reject) {
                      file.mv(path.join(audioDir, req.params.file + '.mp3'), function (err) {
                        if (err) reject(err);else resolve();
                      });
                    });

                  case 19:
                    _context2.next = 24;
                    break;

                  case 21:
                    _context2.prev = 21;
                    _context2.t1 = _context2['catch'](16);
                    return _context2.abrupt('return', fail(res, 'error uploading file', next));

                  case 24:

                    res.type('json');
                    res.status(200);
                    res.send({ msg: 'upload successful' });
                    next();

                  case 28:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined, [[8, 13], [16, 21]]);
          }));

          return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  };
});