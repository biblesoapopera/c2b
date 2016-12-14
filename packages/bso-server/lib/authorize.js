'use strict';

System.register('bso-server/authorize', ['babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', './api/helpers/fail'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _Promise, _asyncToGenerator, fail;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_apiHelpersFail) {
      fail = _apiHelpersFail.default;
    }],
    execute: function () {
      _export('default', function (rbac, action, resource) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var role, allow, i;
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    role = void 0;
                    allow = void 0;
                    i = 0;

                  case 3:
                    if (!(i < req.user.roles.length)) {
                      _context2.next = 20;
                      break;
                    }

                    role = req.user.roles[i];

                    _context2.prev = 5;
                    _context2.next = 8;
                    return new _Promise(function (resolve, reject) {
                      rbac.can(role, action, resource, function (err, can) {
                        if (err) {
                          reject(err);
                          return;
                        }
                        resolve(!!can);
                      });
                    });

                  case 8:
                    allow = _context2.sent;
                    _context2.next = 14;
                    break;

                  case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2['catch'](5);
                    return _context2.abrupt('return', fail(res, 'internal error', next));

                  case 14:
                    if (!allow) {
                      _context2.next = 17;
                      break;
                    }

                    next();
                    return _context2.abrupt('return');

                  case 17:
                    i++;
                    _context2.next = 3;
                    break;

                  case 20:

                    res.status(403);
                    res.type('json');
                    res.send({ msg: 'not authorized' });
                    next('route');

                  case 24:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined, [[5, 11]]);
          }));

          return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }();
      });
    }
  };
});