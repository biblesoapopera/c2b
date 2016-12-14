'use strict';

System.register('bso-server/api/audio/helpers/checkFilename', ['../../helpers/fail', 'filename-reserved-regex'], function (_export, _context) {
  "use strict";

  var fail, filenameReservedRegex;
  return {
    setters: [function (_helpersFail) {
      fail = _helpersFail.default;
    }, function (_filenameReservedRegex) {
      filenameReservedRegex = _filenameReservedRegex.default;
    }],
    execute: function () {
      _export('default', function (req, res, next) {
        if (!req.params || !req.params.file || filenameReservedRegex().test(req.params.file)) {
          fail(res, 'invalid filename', next);
        } else {
          return true;
        }
      });
    }
  };
});