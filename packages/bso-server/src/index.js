import express from 'express'
import staticAssets from './static'
import login from './login'
import key from './jwt-key'

let port = 8080
let app = express()

login(app, key)
staticAssets(app)

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})
