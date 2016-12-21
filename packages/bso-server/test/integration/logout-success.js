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
let db = dbFn('mongodb://localhost:27020/test-login-success')
let audioData = path.join(__dirname, '..', 'temp')

let token = jwt.sign({
  sub: 'test@test.com',
  name: 'John Test',
  lv: 1,
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 10)
}, key)

app.use('/', router({
  key:key,
  rbac: rbac,
  db: db,
  audioData: audioData
}))

export let timeout = 5000
export default async () => {

  // create user to query against
  await db.user.create({
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
    .get('/logout')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .set('authorization', 'jwt ' + token)
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({msg: 'logged out'})
    .end((err, res) => {
      if (err) pReject(err)
      else pResolve()
    })

  await p

  // check token added to revokedTokens
  let count = await db.revokedToken.exists(token)
  assert.equal(1, count)

  // cleanup
  await new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  mongoose.connection.close()
}
