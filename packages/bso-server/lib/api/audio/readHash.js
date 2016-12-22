'use strict';

System.register('bso-server/api/audio/readHash', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', '../helpers/checkFilename'], function (_export, _context) {
    "use strict";

    var _regeneratorRuntime, _asyncToGenerator, checkFilename;

    return {
        setters: [function (_babelRuntimeRegenerator) {
            _regeneratorRuntime = _babelRuntimeRegenerator.default;
        }, function (_babelRuntimeHelpersAsyncToGenerator) {
            _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
        }, function (_helpersCheckFilename) {
            checkFilename = _helpersCheckFilename.default;
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
                                        if (checkFilename(req)) {
                                            _context2.next = 2;
                                            break;
                                        }

                                        return _context2.abrupt('return');

                                    case 2:
                                        file = req.params.file;
                                        _context2.next = 5;
                                        return db.audioHash.find(req.params.file + '.mp3');

                                    case 5:
                                        hash = _context2.sent.hash;


                                        res.type('json');
                                        res.status(200);
                                        res.send({ hash: hash });
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