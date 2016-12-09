import chai from 'chai'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import jwt from 'jsonwebtoken'
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
        if (err) reject(err)
        else resolve()
      })
  })
}
