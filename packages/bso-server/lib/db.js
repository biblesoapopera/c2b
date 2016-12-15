'use strict';

System.register('bso-server/db', ['babel-runtime/core-js/promise', 'mongoose', './db/user', './db/series', './db/episode', './db/audioHash'], function (_export, _context) {
  "use strict";

  var _Promise, mongoose, user, series, episode, audioHash;

  return {
    setters: [function (_babelRuntimeCoreJsPromise) {
      _Promise = _babelRuntimeCoreJsPromise.default;
    }, function (_mongoose) {
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
        mongoose.Promise = _Promise;
        if (mongoose.connection.readyState === 0 || //disconnected
        mongoose.connection.readyState === 3 //disconnecting
        ) {
            mongoose.connect(url);
          }

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