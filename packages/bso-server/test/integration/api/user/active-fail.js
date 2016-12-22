import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import testConfig from 'bso-server/test/resource/test-server-config'

let app = express()
let config = testConfig('active-fail')

app.use('/', router(config))

export let timeout = 5000
export default async () => {

  let pResolve
  let pReject
  let p = new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
  })

  request(app)
    .get('/user/active')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({roles: ['guest']})
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p
}
