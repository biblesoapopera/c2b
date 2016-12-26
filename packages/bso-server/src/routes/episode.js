import authenticate from '../authenticate'
import authorize from '../authorize'
import api from '../api'
import bodyParser from 'body-parser'

export default (cfg, router) => {
  router.get(
    '/episode/:id',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'read', 'episode'),
    api.episode.readId(cfg.db)
  )
  router.put(
    '/episode',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'create', 'episode'),
    bodyParser.json(),
    api.episode.create(cfg.db)
  )
  router.patch(
    '/episode/:id',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'update', 'episode'),
    bodyParser.json(),
    api.episode.update(cfg.db)
  )
  router.delete(
    '/episode/:id',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'delete', 'episode'),
    api.episode.delete(cfg.db)
  )
}
