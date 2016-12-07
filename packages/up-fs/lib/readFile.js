'use strict';

System.register('up-fs/readFile', ['babel-runtime/core-js/promise'], function (_export, _context) {
  "use strict";

  var _Promise, fs;

  return {
    setters: [function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }],
    execute: function () {
      fs = require('fs');

      _export('default', function (file) {
        return new _Promise(function (resolve, reject) {
          fs.readFile(file, function (err, data) {
            if (err) {
              reject(err);
              return;
            }
            resolve(data);
          });
        });
      });
    }
  };
});