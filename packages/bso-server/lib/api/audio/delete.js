'use strict';

System.register('bso-server/api/audio/delete', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'path', 'del', '../helpers/checkFilename'], function (_export, _context) {
    "use strict";

    var _regeneratorRuntime, _asyncToGenerator, path, del, checkFilename;

    return {
        setters: [function (_babelRuntimeRegenerator) {
            _regeneratorRuntime = _babelRuntimeRegenerator.default;
        }, function (_babelRuntimeHelpersAsyncToGenerator) {
            _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
        }, function (_path) {
            path = _path.default;
        }, function (_del) {
            del = _del.default;
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
                                        if (checkFilename(req)) {
                                            _context2.next = 2;
                                            break;
                                        }

                                        return _context2.abrupt('return');

                                    case 2:
                                        _context2.next = 4;
                                        return db.audioHash.delete(req.params.file + '.mp3');

                                    case 4:
                                        _context2.next = 6;
                                        return del([path.join(audioDir, req.params.file + '.mp3')]);

                                    case 6:

                                        res.type('json');
                                        res.status(200);
                                        res.send({ msg: 'delete successful' });
                                        next();

                                    case 10:
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