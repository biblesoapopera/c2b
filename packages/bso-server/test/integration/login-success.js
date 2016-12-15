import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import jwt from 'jsonwebtoken'
import dbFn from 'bso-server/db'
import rbac from 'bso-server/rbac'
import path from 'path'
import mongoose from 'mongoose'
import hash from 'password-hash'

let app = express()
let key = 'testing testing'
let db = dbFn('mongodb://localhost:27017/test-login-success')
let audioDir = path.join(__dirname, '..', 'temp')

app.use('/', router({
  key:key,
  rbac: rbac,
  db: db,
  audioDir: audioDir
}))

export let timeout = 5000
export default async () => {

  // create user to query against
  await db.user.create({
    username: 'test@test.com',
    password: hash.generate('test123'),
    name: 'John Test',
    roles: ['student']
  })

  let pResolve
  let pReject
  let p = new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
  })

  // do the testing
  request(app)
    .post('/login')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({username: 'test@test.com', password: 'test123'})
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(res => {
      let token = res.headers.authorization.slice(4)
      let payload = jwt.verify(token, key)
      assert.equal(payload.sub, 'test@test.com', 'login user.username not as expected')
      assert.equal(payload.name, 'John Test', 'login user.name not as expected')
    })
    .expect({msg: 'logged in'})
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  // cleanup
  await new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  mongoose.connection.close()
}
