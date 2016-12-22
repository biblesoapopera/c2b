'use strict';

System.register('bso-server/api', ['./api/series', './api/episode', './api/audio', './api/user', './api/episodeImg'], function (_export, _context) {
  "use strict";

  var series, episode, audio, user, episodeImg;
  return {
    setters: [function (_apiSeries) {
      series = _apiSeries.default;
    }, function (_apiEpisode) {
      episode = _apiEpisode.default;
    }, function (_apiAudio) {
      audio = _apiAudio.default;
    }, function (_apiUser) {
      user = _apiUser.default;
    }, function (_apiEpisodeImg) {
      episodeImg = _apiEpisodeImg.default;
    }],
    execute: function () {
      _export('default', {
        series: series,
        episode: episode,
        audio: audio,
        user: user,
        episodeImg: episodeImg
      });
    }
  };
});