import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import mongooseCleanup from 'bso-server/test/resource/mongoose-cleanup'
import testConfig from 'bso-server/test/resource/test-server-config'

let app = express()
let config = testConfig('logout-success')

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
    .post('/user/login')
    .set('Accept', 'application/json')
    .send({username: 'bad user', password: 'test123'})
    .expect(401)
    .expect('Content-Type', /json/)
    .expect(res => {
      assert.isNotOk(res.headers.authorization, 'Authorization header should not be set on a failed login')
    })
    .expect({msg: 'login fail'})
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  await mongooseCleanup()
}
