'use strict';

System.register('up-fs/writeFile', ['babel-runtime/core-js/promise'], function (_export, _context) {
  "use strict";

  var _Promise, fs;

  return {
    setters: [function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }],
    execute: function () {
      fs = require('fs');

      _export('default', function (file, data) {
        return new _Promise(function (resolve, reject) {
          fs.writeFile(file, data, { encoding: 'utf8' }, function (err) {
            if (err) {
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