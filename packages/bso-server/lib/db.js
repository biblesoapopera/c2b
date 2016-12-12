'use strict';

System.register('bso-server/db', ['mongoose', './db/user', './db/series', './db/episode'], function (_export, _context) {
  "use strict";

  var mongoose, user, series, episode;
  return {
    setters: [function (_mongoose) {
      mongoose = _mongoose.default;
    }, function (_dbUser) {
      user = _dbUser.default;
    }, function (_dbSeries) {
      series = _dbSeries.default;
    }, function (_dbEpisode) {
      episode = _dbEpisode.default;
    }],
    execute: function () {
      _export('default', function (url) {
        mongoose.connect(url);
        return {
          user: user,
          series: series,
          episode: episode
        };
      });
    }
  };
});