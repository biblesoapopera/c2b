import staticAssets from './routes/static'
import errHandler from './errHandler'
import express from 'express'
import user from './routes/user'
import series from './routes/series'
import episode from './routes/episode'
import audioData from './routes/audioData'
import langData from './routes/langData'
import episodeImgData from './routes/episodeImgData'

export default (cfg) => {
  let router = express.Router()

  // TODO add parameter validation

  user(cfg, router)
  series(cfg, router)
  episode(cfg, router)
  audioData(cfg, router)
  langData(cfg, router)
  episodeImgData(cfg, router)

  router.use(staticAssets())
  router.use(errHandler(cfg.logger))

  return router
}
