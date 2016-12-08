import chai from 'chai'
import request from 'supertest'
import express from 'express'
import login from 'bso-server/login'
import db from 'bso-server/db'
import err from 'bso-server/err'

let assert = chai.assert
let app = express()
let key = 'testing testing'

login(app, key, db)
err(app)

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
