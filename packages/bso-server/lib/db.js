'use strict';

System.register('bso-server/db', ['./db/user', './db/series', './db/episode'], function (_export, _context) {
  "use strict";

  var user, series, episode;
  return {
    setters: [function (_dbUser) {
      user = _dbUser.default;
    }, function (_dbSeries) {
      series = _dbSeries.default;
    }, function (_dbEpisode) {
      episode = _dbEpisode.default;
    }],
    execute: function () {
      _export('default', function (url) {
        return {
          user: user(url),
          series: series(url),
          episode: episode(url)
        };
      });
    }
  };
});