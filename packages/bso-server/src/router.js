import staticAssets from './static'
import login from './login'
import bodyParser from 'body-parser'
import api from './api'
import err from './err'
import authenticate from './authenticate'
import authorize from './authorize'
import express from 'express'
import fileUpload from 'express-fileupload'

export default (cfg) => {
  let router = express.Router()

  router.post('/login', bodyParser.json(), login(cfg.key, cfg.db))

  router.get('/series/:lang', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'read', 'series'), api.series.readLang(cfg.db))

  router.get('/episode/:id', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'read', 'episode'), api.episode.readId(cfg.db))

  router.put('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'create', 'audio'), fileUpload(), api.audio.create(cfg.audioDir))
  router.patch('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'update', 'audio'), fileUpload(), api.audio.update(cfg.audioDir))
  router.delete('/audio/:file', authenticate(cfg.key, cfg.db), authorize(cfg.rbac, 'delete', 'audio'), bodyParser.json(), api.audio.delete(cfg.audioDir))

  router.use(audioLib())
  router.use(staticAssets())
  router.use(err())

  return router
}
