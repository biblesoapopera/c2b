'use strict';

System.register('bso-server/api/audio/helpers/checkMime', [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      _export('default', function (req) {
        var file = req.files.audio;
        if (!/audio\/mpeg3/.test(file.mimetype)) throw new Error('uploaded file is not an mp3 audio file');else return true;
      });
    }
  };
});