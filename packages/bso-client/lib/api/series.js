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
                        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(obj) {
                            return regeneratorRuntime.wrap(function _callee$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.next = 2;
                                            return xhr.post('/series', obj);

                                        case 2:
                                            return _context2.abrupt('return', _context2.sent);

                                        case 3:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee, undefined);
                        }));

                        return function create(_x) {
                            return _ref.apply(this, arguments);
                        };
                    }(),

                    'delete': function _delete() {},

                    publish: function publish() {},

                    readLangAll: function () {
                        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(lang) {
                            return regeneratorRuntime.wrap(function _callee2$(_context3) {
                                while (1) {
                                    switch (_context3.prev = _context3.next) {
                                        case 0:
                                            _context3.next = 2;
                                            return xhr.get('/series/' + lang + '/all');

                                        case 2:
                                            return _context3.abrupt('return', _context3.sent);

                                        case 3:
                                        case 'end':
                                            return _context3.stop();
                                    }
                                }
                            }, _callee2, undefined);
                        }));

                        return function readLangAll(_x2) {
                            return _ref2.apply(this, arguments);
                        };
                    }(),

                    readLangPublished: function () {
                        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(lang) {
                            return regeneratorRuntime.wrap(function _callee3$(_context4) {
                                while (1) {
                                    switch (_context4.prev = _context4.next) {
                                        case 0:
                                            _context4.next = 2;
                                            return xhr.get('/series/' + lang + '/published');

                                        case 2:
                                            return _context4.abrupt('return', _context4.sent);

                                        case 3:
                                        case 'end':
                                            return _context4.stop();
                                    }
                                }
                            }, _callee3, undefined);
                        }));

                        return function readLangPublished(_x3) {
                            return _ref3.apply(this, arguments);
                        };
                    }(),

                    unpublish: function unpublish() {},

                    update: function update() {}
                };
            });
        }
    };
});