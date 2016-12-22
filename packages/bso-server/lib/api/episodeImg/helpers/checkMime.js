'use strict';

System.register('bso-server/api/episodeImg/helpers/checkMime', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (req) {
        var file = req.files.audio;
        if (!/image\/jpeg/.test(file.mimetype)) throw new Error('uploaded file is not an jpg image file');else return true;
      });
    }
  };
});