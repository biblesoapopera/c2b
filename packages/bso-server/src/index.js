import express from 'express'
import dbFn from './db'
import rbac from './rbac'
import config from './config'
import router from './router'
import logger from './logger'

let app = express()
let db = dbFn(config.dbUrl)

app.use('/', router({
  key: config.jwkKey,
  rbac: rbac,
  db: db,
  audioDir: config.audioDir,
  logger: logger
}))

app.listen(config.port, function () {
  console.log('c2b app listening on port ' + config.port)
})

// clear tokens on startup and once a day
let clean = () => {
  db.revokedToken.clean()
  setTimeout(clean, 1000 * 60 * 60 * 24)
}
clean()
