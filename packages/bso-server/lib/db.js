'use strict';

System.register('bso-server/db', ['./db/user/user', './db/series/series', './db/episode/episode'], function (_export, _context) {
  "use strict";

  var user, series, episode;
  return {
    setters: [function (_dbUserUser) {
      user = _dbUserUser.default;
    }, function (_dbSeriesSeries) {
      series = _dbSeriesSeries.default;
    }, function (_dbEpisodeEpisode) {
      episode = _dbEpisodeEpisode.default;
    }],
    execute: function () {
      _export('default', {
        user: user,
        series: series,
        episode: episode
      });
    }
  };
});