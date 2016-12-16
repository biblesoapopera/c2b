import express from 'express'
import dbFn from './db'
import rbac from './rbac'
import config from './config'
import router from './router'
import logger from './logger'

let app = express()

app.use('/', router({
  key: config.jwkKey,
  rbac: rbac,
  db: dbFn(config.dbUrl),
  audioDir: config.audioDir,
  logger: logger
}))

app.listen(config.port, function () {
  console.log('c2b app listening on port ' + config.port)
})
