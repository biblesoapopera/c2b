'use strict';

System.register('bso-server/routes/langData', ['express'], function (_export, _context) {
  "use strict";

  var express;
  return {
    setters: [function (_express) {
      express = _express.default;
    }],
    execute: function () {
      _export('default', function (cfg, router) {
        router.use('/lang', express.static(cfg.langData));
      });
    }
  };
});