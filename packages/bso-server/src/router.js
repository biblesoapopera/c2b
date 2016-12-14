import staticAssets from './static'
import err from './err'
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
  router.use(err())

  return router
}
