'use strict';

System.register('bso-client/store', ['./store/lang', './store/series'], function (_export, _context) {
  "use strict";

  var lang, series;
  return {
    setters: [function (_storeLang) {
      lang = _storeLang.default;
    }, function (_storeSeries) {
      series = _storeSeries.default;
    }],
    execute: function () {
      _export('default', {
        lang: lang,
        series: series
      });
    }
  };
});