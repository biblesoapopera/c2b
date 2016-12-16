'use strict';

System.register('bso-server/api/audio/helpers/checkFilename', ['filename-reserved-regex'], function (_export, _context) {
  "use strict";

  var filenameReservedRegex;
  return {
    setters: [function (_filenameReservedRegex) {
      filenameReservedRegex = _filenameReservedRegex.default;
    }],
    execute: function () {
      _export('default', function (req) {
        if (!req.params || !req.params.file || filenameReservedRegex().test(req.params.file)) {
          throw new Error('invalid filename');
        } else {
          return true;
        }
      });
    }
  };
});