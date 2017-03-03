import authenticate from '../authenticate'
import authorize from '../authorize'
import api from '../api'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import express from 'express'

export default (cfg, router) => {
  router.put(
    '/audio/:file',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'create', 'audio'),
    fileUpload(),
    api.audio.create(cfg.audioData, cfg.db)
  )
  router.patch(
    '/audio/:file',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'update', 'audio'),
    fileUpload(),
    api.audio.update(cfg.audioData, cfg.db)
  )
  router.delete(
    '/audio/:file',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'delete', 'audio'),
    bodyParser.json(),
    api.audio.delete(cfg.audioData, cfg.db)
  )
  router.get(
    '/audio/:file/hash',
    api.audio.readHash(cfg.audioData, cfg.db)
  )

  router.use('/audio', express.static(cfg.audioData))
}
