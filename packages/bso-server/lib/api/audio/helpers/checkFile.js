'use strict';

System.register('bso-server/api/audio/helpers/checkFile', ['../../helpers/fail'], function (_export, _context) {
  "use strict";

  var fail;
  return {
    setters: [function (_helpersFail) {
      fail = _helpersFail.default;
    }],
    execute: function () {
      _export('default', function (req, res, next) {
        if (!req.files || !req.files.audio) fail(res, 'no file uploaded', next);else return true;
      });
    }
  };
});