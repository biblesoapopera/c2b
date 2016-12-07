'use strict';

System.register('up-fs/isdir', ['babel-runtime/core-js/promise'], function (_export, _context) {
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
          fs.stat(path, function (err, stat) {
            if (err) {
              reject(err);
              return;
            }
            if (stat.isDirectory()) resolve(true);else resolve();
          });
        });
      });
    }
  };
});