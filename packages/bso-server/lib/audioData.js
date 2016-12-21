'use strict';

System.register('bso-server/audioData', ['express'], function (_export, _context) {
  "use strict";

  var express;
  return {
    setters: [function (_express) {
      express = _express.default;
    }],
    execute: function () {
      _export('default', function (audioData) {
        return express.static(audioData);
      });
    }
  };
});