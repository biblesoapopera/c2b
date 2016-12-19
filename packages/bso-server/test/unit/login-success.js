import assert from 'bso-tools/assert'
import login from 'bso-server/login'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'
import hash from 'password-hash'
import sinon from 'sinon'

let key = 'testing testing'
let mockDb = {user: {find: () => {}}}
let next = sinon.stub()

let userFind = sinon.stub(mockDb.user, 'find')
userFind.returns({
  username: 'test@test.com',
  password: hash.generate('password123'),
  name: 'John Test',
  loginVersion: 1
})

export default async () => {
  let fn = login(key, mockDb)

  let req = new MockRequest({
    method: 'post',
    body: {
      username: 'test@test.com',
      password: 'password123'
    }
  })

  let res = new MockResponse()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))

  let token = res.getHeader('authorization').slice(4)
  let payload = jwt.verify(token, key)

  assert.equal(payload.sub, 'test@test.com', 'login user.username not as expected')
  assert.equal(payload.name, 'John Test', 'login user.name not as expected')
  assert.equal(payload.lv, 1)
  assert.ok(payload.exp)

  assert.calledOnce(userFind)
  assert.calledWith(userFind, {username: 'test@test.com'})

  assert.isOk(req.user)
}
