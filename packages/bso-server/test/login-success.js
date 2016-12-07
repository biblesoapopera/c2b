import chai from 'chai'
import request from 'supertest'
import express from 'express'
import login from 'bso-server/login'
import jwt from 'jsonwebtoken'

let assert = chai.assert
let app = express()
let key = 'testing testing'

login(app, key)

export default () => {
  return new Promise((resolve, reject) => {
    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send({username: 'test@test.com', password: 'test123'})
      .expect('Content-Type', /json/)
      .expect(res => {
        let token = res.headers.authorization.slice(4)
        let payload = jwt.verify(token, key)
        assert.equal(payload.sub, 1, 'login user.id not as expected')
        assert.equal(payload.name, 'John Test', 'login user.name not as expected')
      })
      .expect({msg: 'logged in'})
      .expect(200)
      .end((err, res) => {
        if (err) reject(err)
        else resolve()
      })
  })
}
