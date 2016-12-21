'use strict';

System.register('bso-server/router', ['./static', './errHandler', 'express', './routes/login', './routes/series', './routes/episode', './routes/audioData'], function (_export, _context) {
  "use strict";

  var staticAssets, errHandler, express, login, series, episode, audioData;
  return {
    setters: [function (_static) {
      staticAssets = _static.default;
    }, function (_errHandler) {
      errHandler = _errHandler.default;
    }, function (_express) {
      express = _express.default;
    }, function (_routesLogin) {
      login = _routesLogin.default;
    }, function (_routesSeries) {
      series = _routesSeries.default;
    }, function (_routesEpisode) {
      episode = _routesEpisode.default;
    }, function (_routesAudioData) {
      audioData = _routesAudioData.default;
    }],
    execute: function () {
      _export('default', function (cfg) {
        var router = express.Router();

        // TODO add parameter validation

        login(cfg, router);
        series(cfg, router);
        episode(cfg, router);
        audioData(cfg, router);

        router.use(staticAssets());
        router.use(errHandler(cfg.logger));

        return router;
      });
    }
  };
});