'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var System = {};

  var store = { a: 1 };

  System.resolve = function (mid) {
    var parts = mid.split('/');
    if (parts.length > 0 && parts[1] === 'test') return mid;

    var prefix = mid.split('-')[0];
    if (prefix === 'bso' || prefix === 'up') return mid.replace('/', '/lib/');
    return mid;
  };

  var requireMid = function requireMid(mid) {
    return require(System.resolve(mid));
  };

  System.register = function (mid, deps, fn) {
    store[mid] = {
      deps: deps,
      fn: fn,
      exportObj: {},
      executed: false
    };
  };

  System.import = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(mid) {
      var mod, deps, obj;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (store[mid]) {
                _context2.next = 12;
                break;
              }

              mod = requireMid(mid);

              if (!mod.__esModule) {
                _context2.next = 7;
                break;
              }

              store[mid] = {
                deps: [],
                exportObj: mod,
                executed: true
              };
              return _context2.abrupt('return', store[mid].exportObj);

            case 7:
              if (store[mid]) {
                _context2.next = 10;
                break;
              }

              store[mid] = {
                deps: [],
                exportObj: { default: mod },
                executed: true
              };
              return _context2.abrupt('return', store[mid].exportObj);

            case 10:
              _context2.next = 14;
              break;

            case 12:
              if (!store[mid].executed) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', store[mid].exportObj);

            case 14:
              _context2.next = 16;
              return _promise2.default.all(store[mid].deps.map(function () {
                var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dep) {
                  var depParts, midParts, depMid;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          depParts = dep.split('/');
                          midParts = mid.split('/');

                          if (midParts.length > 1) midParts.pop();
                          depMid = [];

                          if (depParts[0] === '.') {
                            depMid = midParts;
                            depParts.shift();
                          } else if (depParts[0] === '..') {
                            depMid = midParts;
                            while (depParts[0] === '..') {
                              depMid.pop();
                              depParts.shift();
                            }
                          }

                          dep = depMid.concat(depParts);
                          dep = dep.join('/');

                          _context.prev = 7;
                          _context.next = 10;
                          return System.import(dep);

                        case 10:
                          return _context.abrupt('return', _context.sent);

                        case 13:
                          _context.prev = 13;
                          _context.t0 = _context['catch'](7);
                          throw new Error('This error occured while importing dependencies for ' + mid + ': \n' + _context.t0.stack);

                        case 16:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, undefined, [[7, 13]]);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 16:
              deps = _context2.sent;
              obj = store[mid].fn(function (name, value) {
                store[mid].exportObj[name] = value;
              });


              obj.setters.forEach(function (setter, idx) {
                setter(deps[idx]);
              });

              obj.execute();
              store[mid].executed = true;

              return _context2.abrupt('return', store[mid].exportObj);

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  global.System = System;
})();