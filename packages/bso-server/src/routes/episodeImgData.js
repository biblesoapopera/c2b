import authenticate from '../authenticate'
import authorize from '../authorize'
import api from '../api'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import express from 'express'

export default (cfg, router) => {
  router.put(
    '/episode-img/:lang/:series/:file',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'create', 'episode-img'),
    fileUpload(),
    api.episodeImg.create(cfg.audioData)
  )
  router.patch(
    '/episode-img/:lang/:series/:file',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'update', 'episode-img'),
    fileUpload(),
    api.episodeImg.update(cfg.audioData)
  )
  router.delete(
    '/episode-img/:lang/:series/:file',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'delete', 'episode-img'),
    bodyParser.json(),
    api.episodeImg.delete(cfg.audioData)
  )
  router.use('/episode-img', express.static(cfg.episodeImgData))
}
