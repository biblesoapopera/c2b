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
        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                result = void 0;
                _context2.prev = 1;
                _context2.next = 4;
                return db.episode.create({
                  "lang": "en",
                  "series": 0,
                  "episode": 0,
                  "title": "Demo Episode",
                  "summary": "This episode contains the pilot audio drama with accompanying discussion questions.",
                  "img": "abc123",
                  "primaryAudio": "en_series1_episode1",
                  "slides": [{
                    "text": {
                      "text": "<p>Hello. Welcome to this drama lesson. Today we are going to learn about Abraham and how he trusted God's word.</p>",
                      "audio": {
                        file: "test_audio1",
                        start: 0,
                        end: 3
                      }
                    }
                  }, {
                    "text": {
                      "text": "<p>Remember when God asked Abraham to sacrifice his son Isaac? Read it now in Genesis 22.</p><p>Click next when you're ready.</p>",
                      "audio": {
                        file: "test_audio2",
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
                  }, {
                    "listen": {
                      "text": "Listen to Paul's story.",
                      "audio": {
                        "file": "en_series1_episode1",
                        "start": 0,
                        "end": 494
                      }
                    }
                  }, {
                    "text": {
                      "text": "<p>Paul is in trouble again - what will he do?</p><p>Answer these questions to find out.</p>"
                    }
                  }, {
                    "pick": {
                      "question": "What did Paul’s uncle give him as a gift?",
                      "answers": [{
                        "value": "TV",
                        "score": 100,
                        "feedback": "Yes, Paul's uncle gave him a TV"
                      }, {
                        "value": "phone",
                        "score": 0,
                        "feedback": "No, Paul's uncle didn't give him a phone"
                      }, {
                        "value": "football",
                        "score": 0,
                        "feedback": "No, Paul's uncle didn't gave him a football"
                      }],
                      "feedback": {
                        "incorrect": "Please try again",
                        "complete": "Good stuff"
                      },
                      "completeWhen": "correct"
                    }
                  }]
                });

              case 4:
                result = _context2.sent;
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](1);

                console.log(_context2.t0);
                console.log(_JSON$stringify(_context2.t0.errors, null, '  '));

              case 11:
                console.log(result);
                console.log('done');

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee, undefined, [[1, 7]]);
      })));
    }
  };
});