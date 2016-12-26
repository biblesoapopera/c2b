'use strict';

System.register('bso-server/tmp', ['babel-runtime/regenerator', 'babel-runtime/core-js/json/stringify', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/promise', 'mongoose', 'bso-server/db'], function (_export, _context) {
  "use strict";

  var _regeneratorRuntime, _JSON$stringify, _asyncToGenerator, _Promise, mongoose, dbFn, db;

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
                return db.episode.create({
                  "lang": "en",
                  "series": 0,
                  "title": "Demo Episode",
                  "subtitle": "Learn the whole Bible. Find Jesus in every story.",
                  "summary": "This episode contains the pilot audio drama with accompanying discussion questions.",
                  "img": "abc123",
                  "audio": [],
                  "slides": [{
                    "text": {
                      "text": "<p>Hello. Welcome to this drama lesson. Today we are going to learn about Abraham and how he trusted God's word.</p>",
                      "audio": {
                        file: "abc123",
                        start: 0,
                        end: 10
                      }
                    }
                  }, {
                    "text": {
                      "text": "<p>Remember when God asked Abraham to sacrifice his son Isaac? Read it now in Genesis 22.</p><p>Click next when you're ready.</p>",
                      "audio": {
                        file: "abc123",
                        start: 0,
                        end: 10
                      }
                    }
                  }, {
                    "slider": {
                      "question": "Why do you think God asked Abraham to sacrifice Isaac?",
                      "answers": [{
                        "value": "To check Abraham - perhaps he had disobeyed God",
                        "score": 100
                      }, {
                        "value": "To show Abraham what God was like, and teach him about resurrection",
                        "score": 0
                      }],
                      "completeWhen": "always"
                    }
                  }] });

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