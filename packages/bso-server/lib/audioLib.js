'use strict';

System.register('bso-server/audioLib', ['path', 'express'], function (_export, _context) {
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
        return express.static('/audio', path.join(__dirname, '..', '..', '..', 'audio_lib'));
      });
    }
  };
});