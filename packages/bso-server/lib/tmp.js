'use strict';

System.register('bso-server/tmp', ['babel-runtime/regenerator', 'babel-runtime/core-js/json/stringify', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/promise', 'mongoose', 'bso-server/db', 'password-hash'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _JSON$stringify, _asyncToGenerator, _Promise, mongoose, dbFn, hash, db;

  return {
    setters: [function (_babelRuntimeRegenerator) {
      _regeneratorRuntime = _babelRuntimeRegenerator.default;
    }, function (_babelRuntimeCoreJsJsonStringify) {
      _JSON$stringify = _babelRuntimeCoreJsJsonStringify.default;
    }, function (_babelRuntimeHelpersAsyncToGenerator) {
      _asyncToGenerator = _babelRuntimeHelpersAsyncToGenerator.default;
    }, function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_mongoose) {
      mongoose = _mongoose.default;
    }, function (_bsoServerDb) {
      dbFn = _bsoServerDb.default;
    }, function (_passwordHash) {
      hash = _passwordHash.default;
    }],
    execute: function () {

      mongoose.Promise = _Promise;

      db = dbFn('mongodb://localhost:27017/c2b');

      _export('default', _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
        var _result;

        return _regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return db.user.create({
                  username: 'marty@marty.com',
                  password: hash.generate('marty'),
                  name: 'Marty Olmos',
                  roles: ['editor'],
                  loginVersion: 1
                });

              case 3:
                _result = _context2.sent;
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);

                console.log(_context2.t0);
                console.log(_JSON$stringify(_context2.t0.errors, null, '  '));

              case 10:
                console.log(result);
                console.log('done');

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, undefined, [[0, 6]]);
      })));
    }
  };
});