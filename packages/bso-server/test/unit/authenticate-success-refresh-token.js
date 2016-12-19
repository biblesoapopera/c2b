import assert from 'bso-tools/assert'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'
import sinon from 'sinon'


let key = 'testing testing'
let mockDb = {user: {find: () => {}}, revokedToken: {exists: () => {}}}

let userFind = sinon.stub(mockDb.user, 'find')
userFind.returns({
  username: 'test@test.com',
  loginVersion: 1
})

let revokedTokenExists = sinon.stub(mockDb.revokedToken, 'exists')
revokedTokenExists.returns(0)

let next = sinon.stub()

let token = jwt.sign({
  sub: 'test@test.com',
  name: 'John Test',
  lv: 1,
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 6)
}, key)

export default async () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({
    headers: {authorization: 'jwt ' + token}
  })
  let res = new MockResponse()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)

  assert.equal(200, res.statusCode)
  assert.deepEqual({
    username: 'test@test.com',
    loginVersion: 1
  }, req.user)

  let newToken = res.getHeader('authorization').slice(4)
  assert.notEqual(token, newToken)

  assert.calledOnce(userFind)
  assert.calledWith(userFind, {username: 'test@test.com'})

  assert.calledOnce(revokedTokenExists)
  assert.calledWith(revokedTokenExists, token)
}
