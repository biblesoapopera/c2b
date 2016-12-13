import express from 'express'
import dbFn from './db'
import rbac from './rbac'
import config from './config'
import router from './router'

let port = 8080
let app = express()
let db = dbFn(config.dbUrl)
let key = config.jwkKey
let audioDir = config.audioDir

app.use('/', router({
  key:key,
  rbac: rbac,
  db: db,
  audioDir: audioDir
}))

app.listen(port, function () {
  console.log('c2b app listening on port ' + port)
})
