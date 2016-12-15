'use strict';

System.register('bso-server/audioLib', ['express'], function (_export, _context) {
  "use strict";

  var express;
  return {
    setters: [function (_express) {
      express = _express.default;
    }],
    execute: function () {
      _export('default', function (audioDir) {
        return express.static(audioDir);
      });
    }
  };
});