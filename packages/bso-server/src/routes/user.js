import api from '../api'
import bodyParser from 'body-parser'
import authenticate from '../authenticate'

export default (cfg, router) => {
  router.post(
    '/user/login',
    bodyParser.json(),
    api.user.login(cfg.key, cfg.db)
  )

  router.get(
    '/user/logout',
    authenticate(cfg.key, cfg.db),
    api.user.logout(cfg.db)
  )

  router.get(
    '/user/active',
    authenticate(cfg.key, cfg.db),
    api.user.active()
  )
}
