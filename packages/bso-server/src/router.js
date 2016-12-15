import staticAssets from './static'
import errHandler from './errHandler'
import express from 'express'
import login from './routes/login'
import series from './routes/series'
import episode from './routes/episode'
import audioFile from './routes/audioFile'

export default (cfg) => {
  let router = express.Router()

  // TODO add parameter validation

  login(cfg, router)
  series(cfg, router)
  episode(cfg, router)
  audioFile(cfg, router)

  router.use(staticAssets())
  router.use(errHandler())

  return router
}
