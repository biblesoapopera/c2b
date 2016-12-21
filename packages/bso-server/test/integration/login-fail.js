import assert from 'bso-tools/assert'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import dbFn from 'bso-server/db'
import rbac from 'bso-server/rbac'
import mongoose from 'mongoose'
import path from 'path'

let app = express()
let key = 'testing testing'
let db = dbFn('mongodb://localhost:27020/test-login-fail')
let audioData = path.join(__dirname, '..', 'temp')

app.use('/', router({
  key:key,
  rbac: rbac,
  db: db,
  audioData: audioData
}))

export let timeout = 5000
export default async () => {

  let pResolve
  let pReject
  let p = new Promise((resolve, reject) => {
    pResolve = resolve
    pReject = reject
  })

  request(app)
    .post('/login')
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

  // cleanup
  await new Promise((resolve, reject) => {
    mongoose.connection.db.dropDatabase(err => {
      if (err) reject(err)
      else resolve()
    })
  })
  mongoose.connection.close()
}
