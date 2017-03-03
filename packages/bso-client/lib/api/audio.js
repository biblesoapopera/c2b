'use strict';

System.register('bso-client/api/audio', [], function (_export, _context) {
  "use strict";

  var _slicedToArray;

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
      _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      _export('default', function (xhr, SparkMD5, FileReader, cache) {
        return {
          has: function has(file) {
            return cache.has(file);
          },
          get: function get(file) {
            return cache.get(file);
          },
          loadLocal: function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(remoteFile, localFile) {
              var remoteHashResponse, remoteHash, resultArrayBuffer, localHash, _ref2, _ref3;

              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return xhr.get('/audio/' + remoteFile + '/hash');

                    case 2:
                      remoteHashResponse = _context2.sent;

                      if (!(remoteHashResponse.status !== 200)) {
                        _context2.next = 5;
                        break;
                      }

                      throw new Error('server error');

                    case 5:
                      remoteHash = remoteHashResponse.body.hash;
                      resultArrayBuffer = void 0;
                      localHash = void 0;
                      _context2.next = 10;
                      return new Promise(function (resolve, reject) {
                        var spark = new SparkMD5.ArrayBuffer();
                        var fileReader = new FileReader();
                        fileReader.onload = function (evt) {
                          spark.append(evt.target.result);

                          resolve([spark.end(), evt.target.result]);
                        };

                        fileReader.onerror = function (err) {
                          reject(err);
                        };

                        fileReader.readAsArrayBuffer(localFile);
                      });

                    case 10:
                      _ref2 = _context2.sent;
                      _ref3 = _slicedToArray(_ref2, 2);
                      localHash = _ref3[0];
                      result = _ref3[1];

                      if (!(localHash !== remoteHash)) {
                        _context2.next = 16;
                        break;
                      }

                      throw new Error('Bad local file');

                    case 16:
                      cache.set(remoteFile, URL.createObjectURL(new Blob([resultArrayBuffer])));

                    case 17:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee, undefined);
            }));

            return function loadLocal(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }(),
          loadRemote: function () {
            var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(remoteFile, progressCb) {
              var remoteFileResponse;
              return regeneratorRuntime.wrap(function _callee2$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return xhr.get('/audio/' + remoteFile + '.mp3', 'blob', progressCb);

                    case 2:
                      remoteFileResponse = _context3.sent;

                      if (!(remoteFileResponse.status !== 200)) {
                        _context3.next = 5;
                        break;
                      }

                      throw new Error('server error');

                    case 5:

                      cache.set(remoteFile, URL.createObjectURL(remoteFileResponse.body));

                    case 6:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee2, undefined);
            }));

            return function loadRemote(_x3, _x4) {
              return _ref4.apply(this, arguments);
            };
          }()
        };
      });
    }
  };
});