'use strict';

System.register('bso-server/api', ['./api/series', './api/episode'], function (_export, _context) {
  "use strict";

  var series, episode;
  return {
    setters: [function (_apiSeries) {
      series = _apiSeries.default;
    }, function (_apiEpisode) {
      episode = _apiEpisode.default;
    }],
    execute: function () {
      _export('default', {
        series: series,
        episode: episode
      });
    }
  };
});