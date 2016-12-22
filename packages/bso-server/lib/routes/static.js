'use strict';

System.register('bso-server/routes/static', ['path', 'express'], function (_export, _context) {
  "use strict";

  var path, express;
  return {
    setters: [function (_path) {
      path = _path.default;
    }, function (_express) {
      express = _express.default;
    }],
    execute: function () {
      _export('default', function () {
        return express.static(path.dirname(require.resolve('bso-client/dist/index.html')));
      });
    }
  };
});