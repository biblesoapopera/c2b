'use strict';

System.register('bso-server/api', ['./api/series', './api/episode', './api/audio'], function (_export, _context) {
  "use strict";

  var series, episode, audio;
  return {
    setters: [function (_apiSeries) {
      series = _apiSeries.default;
    }, function (_apiEpisode) {
      episode = _apiEpisode.default;
    }, function (_apiAudio) {
      audio = _apiAudio.default;
    }],
    execute: function () {
      _export('default', {
        series: series,
        episode: episode,
        audio: audio
      });
    }
  };
});