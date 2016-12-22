'use strict';

System.register('bso-server/api/episodeImg/helpers/checkFile', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (req) {
        if (!req.files || !req.files.img) throw new Error('no file uploaded');else return true;
      });
    }
  };
});