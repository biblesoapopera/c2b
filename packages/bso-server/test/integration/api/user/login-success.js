import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import jwt from 'jsonwebtoken'
import mongooseCleanup from 'bso-server/test/resource/mongoose-cleanup'
import hash from 'password-hash'
import testConfig from 'bso-server/test/resource/test-server-config'

let app = express()
let config = testConfig('login-success')

app.use('/', router(config))

export let timeout = 5000
export default async () => {

  // create user to query against
  await config.db.user.create({
    username: 'test@test.com',
    password: hash.generate('test123'),
    name: 'John Test',
    roles: ['student'],
    loginVersion: 1
  })

  let pResolve
  let pReject
  let p = new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
  })

  // do the testing
  request(app)
    .post('/user/login')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'test@test.com', password: 'test123'})
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      let token = res.headers.authorization.slice(4)
      let payload = jwt.verify(token, config.key)
      assert.equal(payload.sub, 'test@test.com', 'login user.username not as expected')
      assert.equal(payload.name, 'John Test', 'login user.name not as expected')
      assert.equal(1, payload.lv)
    })
    .expect({
      username: 'test@test.com',
      name: 'John Test',
      roles: ['student'],
      lang: 'en'
    })
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  await mongooseCleanup()
}
