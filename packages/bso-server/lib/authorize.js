'use strict';

System.register('bso-server/authorize', ['babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _Promise, _asyncToGenerator;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }],
    execute: function () {
      _export('default', function (rbac, action, resource) {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            var role, i, allow;
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    role = void 0;
                    i = 0;

                  case 2:
                    if (!(i < req.user.roles.length)) {
                      _context2.next = 13;
                      break;
                    }

                    role = req.user.roles[i];
                    _context2.next = 6;
                    return new _Promise(function (resolve, reject) {
                      rbac.can(role, action, resource, function (err, can) {
                        if (err) {
                          reject(err);
                          return;
                        }
                        resolve(!!can);
                      });
                    });

                  case 6:
                    allow = _context2.sent;

                    if (!allow) {
                      _context2.next = 10;
                      break;
                    }

                    next();
                    return _context2.abrupt('return');

                  case 10:
                    i++;
                    _context2.next = 2;
                    break;

                  case 13:

                    res.status(401);
                    next('route');

                  case 15:
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