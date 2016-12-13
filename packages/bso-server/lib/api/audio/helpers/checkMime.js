'use strict';

System.register('bso-server/api/audio/helpers/checkMime', ['../../helpers/fail'], function (_export, _context) {
  "use strict";

  var fail;
  return {
    setters: [function (_helpersFail) {
      fail = _helpersFail.default;
    }],
    execute: function () {
      _export('default', function (req, res, next) {
        var file = req.files.audio;
        if (!/audio\/mpeg3/.test(file.mimetype)) fail(res, 'uploaded file is not an mp3 audio file', next);else return true;
      });
    }
  };
});