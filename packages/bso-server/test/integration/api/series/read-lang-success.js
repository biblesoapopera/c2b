import chai from 'chai'
import request from 'supertest'
import express from 'express'
import router from 'bso-server/router'
import dbFn from 'bso-server/db'
import rbac from 'bso-server/rbac'
import err from 'bso-server/err'
import jwt from 'jsonwebtoken'

let assert = chai.assert
let app = express()
let key = 'testing testing'
let db = dbFn('test')

let token = jwt.sign({sub: 'test@test.com', name: 'John Test'}, key)

app.use('/', router(key, rbac, db))

export default () => {
  return new Promise((resolve, reject) => {
    request(app)
      .get('/series/en')
      .set('Accept', 'application/json')
      .set('authorization', 'jwt ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        // TODO add proper tests on response body
        // console.log(res.body)
      })
      .end((err, res) => {
        if (err) reject(err)
        else resolve()
      })
  })
}
