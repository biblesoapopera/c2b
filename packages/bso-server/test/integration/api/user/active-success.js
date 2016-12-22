import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import jwt from 'jsonwebtoken'
import hash from 'password-hash'
import mongooseCleanup from 'bso-server/test/resource/mongoose-cleanup'
import testConfig from 'bso-server/test/resource/test-server-config'

let app = express()
let config = testConfig('active-success')

let token = jwt.sign({
  sub: 'test@test.com',
  name: 'John Test',
  lv: 1,
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 10)
}, config.key)

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

  request(app)
    .get('/user/active')
    .set('Accept', 'application/json')
    .set('authorization', 'jwt ' + token)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({
      username: 'test@test.com',
      name: 'John Test',
      lang: 'en',
      roles: ['student']
    })
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  await mongooseCleanup()
}
