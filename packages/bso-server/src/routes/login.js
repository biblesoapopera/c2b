import login from '../login'
import logout from '../logout'
import bodyParser from 'body-parser'
import authenticate from '../authenticate'

export default (cfg, router) => {
  router.post(
    '/login',
    bodyParser.json(),
    login(cfg.key, cfg.db)
  )

  router.get(
    '/logout',
    authenticate(cfg.key, cfg.db),
    logout(cfg.db)
  )
}
