import staticAssets from './static'
import login from './login'
import bodyParser from 'body-parser'
import api from './api'
import err from './err'
import authenticate from './authenticate'
import authorize from './authorize'
import express from 'express'

export default (key, rbac, db) => {
  let router = express.Router()

  router.post('/login', bodyParser.json(), login(key, db))

  router.get('/series/:lang', authenticate(key, db), authorize(rbac, 'read', 'series'), api.series.readLang(db))

  router.get('/episode/:id', authenticate(key, db), authorize(rbac, 'read', 'episode'), api.episode.readId(db))

  router.use(staticAssets())
  router.use(err())

  return router
}
