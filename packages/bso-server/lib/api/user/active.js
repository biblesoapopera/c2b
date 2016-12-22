'use strict';

System.register('bso-server/api/user/active', ['babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _asyncToGenerator;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }],
    execute: function () {
      _export('default', function () {
        return function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(req, res, next) {
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    res.type('json');
                    res.status(200);
                    res.send({
                      username: req.user.username,
                      name: req.user.name,
                      lang: req.user.lang,
                      roles: req.user.roles
                    });
                    next();

                  case 4:
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