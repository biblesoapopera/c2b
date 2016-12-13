'use strict';

System.register('bso-server/db', ['mongoose', './db/user', './db/series', './db/episode', './db/audioHash'], function (_export, _context) {
  "use strict";

  var mongoose, user, series, episode, audioHash;
  return {
    setters: [function (_mongoose) {
      mongoose = _mongoose.default;
    }, function (_dbUser) {
      user = _dbUser.default;
    }, function (_dbSeries) {
      series = _dbSeries.default;
    }, function (_dbEpisode) {
      episode = _dbEpisode.default;
    }, function (_dbAudioHash) {
      audioHash = _dbAudioHash.default;
    }],
    execute: function () {
      _export('default', function (url) {
        mongoose.connect(url);
        return {
          user: user,
          series: series,
          episode: episode,
          audioHash: audioHash
        };
      });
    }
  };
});