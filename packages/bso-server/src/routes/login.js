import login from '../login'
import bodyParser from 'body-parser'

export default (cfg, router) => {
  router.post(
    '/login',
    bodyParser.json(),
    login(cfg.key, cfg.db)
  )
}
