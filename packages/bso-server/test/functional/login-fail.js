import chai from 'chai'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import dbFn from 'bso-server/db'
import rbac from 'bso-server/rbac'

let assert = chai.assert
let app = express()
let key = 'testing testing'
let db = dbFn('test')

app.use('/', router(key, rbac, db))

export default () => {
  return new Promise((resolve, reject) => {
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
        if (err) reject(err)
        else resolve()
      })
  })
}
