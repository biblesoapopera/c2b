import express from 'express'
import staticAssets from './static'
import login from './login'
import getSeries from './getSeries'
import err from './err'
import key from './jwt-key'
import db from './db'
import rbac from './rbac'

let port = 8080
let app = express()

login(app, key, db)
getSeries(app, key, rbac, db)
staticAssets(app)
err(app)

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})
