'use strict';

System.register('bso-server/router', ['./routes/static', './errHandler', 'express', './routes/user', './routes/series', './routes/episode', './routes/audioData', './routes/langData', './routes/episodeImgData'], function (_export, _context) {
  "use strict";

  var staticAssets, errHandler, express, user, series, episode, audioData, langData, episodeImgData;
  return {
    setters: [function (_routesStatic) {
      staticAssets = _routesStatic.default;
    }, function (_errHandler) {
      errHandler = _errHandler.default;
    }, function (_express) {
      express = _express.default;
    }, function (_routesUser) {
      user = _routesUser.default;
    }, function (_routesSeries) {
      series = _routesSeries.default;
    }, function (_routesEpisode) {
      episode = _routesEpisode.default;
    }, function (_routesAudioData) {
      audioData = _routesAudioData.default;
    }, function (_routesLangData) {
      langData = _routesLangData.default;
    }, function (_routesEpisodeImgData) {
      episodeImgData = _routesEpisodeImgData.default;
    }],
    execute: function () {
      _export('default', function (cfg) {
        var router = express.Router();

        // TODO add parameter validation

        user(cfg, router);
        series(cfg, router);
        episode(cfg, router);
        audioData(cfg, router);
        langData(cfg, router);
        episodeImgData(cfg, router);

        router.use(staticAssets());
        router.use(errHandler(cfg.logger));

        return router;
      });
    }
  };
});