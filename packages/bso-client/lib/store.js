'use strict';

System.register('bso-client/store', ['./store/lang', './store/series', './store/episode'], function (_export, _context) {
  "use strict";

  var lang, series, episode;
  return {
    setters: [function (_storeLang) {
      lang = _storeLang.default;
    }, function (_storeSeries) {
      series = _storeSeries.default;
    }, function (_storeEpisode) {
      episode = _storeEpisode.default;
    }],
    execute: function () {
      _export('default', {
        lang: lang,
        series: series,
        episode: episode
      });
    }
  };
});