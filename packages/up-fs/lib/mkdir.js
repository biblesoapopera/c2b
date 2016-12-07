'use strict';

System.register('up-fs/mkdir', ['babel-runtime/core-js/promise'], function (_export, _context) {
  "use strict";

  var _Promise, fs;

  return {
    setters: [function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }],
    execute: function () {
      fs = require('fs');

      _export('default', function (path) {
        return new _Promise(function (resolve, reject) {
          fs.mkdir(path, function (err) {
            if (err && err.code !== 'EEXIST') {
              reject(err);
              return;
            }
            resolve();
          });
        });
      });
    }
  };
});