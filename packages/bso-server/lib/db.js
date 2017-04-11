'use strict';

System.register('bso-server/db', ['babel-runtime/core-js/promise', 'mongoose', './db/user', './db/series', './db/episode', './db/audioHash', './db/revokedToken'], function (_export, _context) {
  "use strict";

  var _Promise, mongoose, user, series, episode, audioHash, revokedToken, connect;

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
    }, function (_dbRevokedToken) {
      revokedToken = _dbRevokedToken.default;
    }],
    execute: function () {
      connect = function connect(url) {
        var connection = mongoose.connection;

        connection.on('error', function (err) {
          console.error('error connecting with mongodb database:', err);
        });

        connection.on('disconnected', function () {
          return connect(url);
        });

        if (connection.readyState === 0 || // disconnected
        connection.readyState === 3 // disconnecting
        ) {
            mongoose.connect(url);
          }
      };

      _export('default', function (url) {
        mongoose.Promise = _Promise;

        connect(url);

        return {
          user: user,
          series: series,
          episode: episode,
          audioHash: audioHash,
          revokedToken: revokedToken
        };
      });
    }
  };
});