import router from './router'
import express from 'express'
import cleanRevokedTokens from './cleanRevokedTokens'

let server
let app = express()

export default {
  start: async config => {
    app.use('/', router(config))

    server = await new Promise((resolve, reject) => {
      let server = app.listen(config.port, (err) => {
        if (err) reject(err)
        else resolve(server)
      })
    })
    console.log('c2b app listening on port ' + config.port)

    cleanRevokedTokens(config.db)
  },
  stop: () => {
    if (!server) return
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) reject(err)
        else resolve(server)
      })
    })
  },
  listening: () => server && server.listening
}
