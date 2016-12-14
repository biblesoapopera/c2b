import authenticate from './authenticate'
import authorize from './authorize'
import api from './api'
import bodyParser from 'body-parser'

export default (cfg, router) => {
  router.get(
    '/series/:lang/all',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'readAll', 'series'),
    api.series.readLangAll(cfg.db)
  )
  router.get(
    '/series/:lang/published',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'readPublished', 'series'),
    api.series.readLangPublished(cfg.db)
  )
  router.put(
    '/series',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'create', 'series'),
    bodyParser.json(),
    api.series.create(cfg.db)
  )
  router.delete(
    '/series/:id',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'delete', 'series'),
    api.series.delete(cfg.db)
  )
  router.patch(
    '/series/:id/publish',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'publish', 'series'),
    bodyParser.json(),
    api.series.publish(cfg.db)
  )
  router.patch(
    '/series/:id/unpublish',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'unpublish', 'series'),
    bodyParser.json(),
    api.series.unpublish(cfg.db)
  )
  router.patch(
    '/series/:id',
    authenticate(cfg.key, cfg.db),
    authorize(cfg.rbac, 'update', 'series'),
    bodyParser.json(),
    api.series.update(cfg.db)
  )
}
