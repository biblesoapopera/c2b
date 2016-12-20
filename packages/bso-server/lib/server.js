'use strict';

System.register('bso-server/server', ['babel-runtime/regenerator', 'babel-runtime/core-js/promise', 'babel-runtime/helpers/asyncToGenerator', './router', 'express', './cleanRevokedTokens'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _Promise, _asyncToGenerator, router, express, cleanRevokedTokens, server, app;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_router) {
      router = _router.default;
    }, function (_express) {
      express = _express.default;
    }, function (_cleanRevokedTokens) {
      cleanRevokedTokens = _cleanRevokedTokens.default;
    }],
    execute: function () {
      server = void 0;
      app = express();

      _export('default', {
        start: function () {
          var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(config) {
            return _regeneratorRuntime.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    app.use('/', router(config));

                    _context2.next = 3;
                    return new _Promise(function (resolve, reject) {
                      var server = app.listen(config.port, function (err) {
                        if (err) reject(err);else resolve(server);
                      });
                    });

                  case 3:
                    server = _context2.sent;

                    console.log('c2b app listening on port ' + config.port);

                    cleanRevokedTokens(config.db);

                  case 6:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function start(_x) {
            return _ref.apply(this, arguments);
          };
        }(),
        stop: function stop() {
          if (!server) return;
          return new _Promise(function (resolve, reject) {
            server.close(function (err) {
              if (err) reject(err);else resolve(server);
            });
          });
        },
        listening: function listening() {
          return server && server.listening;
        }
      });
    }
  };
});