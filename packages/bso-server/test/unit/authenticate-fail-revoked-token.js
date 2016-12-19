import assert from 'bso-tools/assert'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'
import sinon from 'sinon'

let key = 'testing testing'
let mockDb = {user: {find: () => {}}, revokedToken: {exists: () => {}}}

let userFind = sinon.stub(mockDb.user, 'find')

let revokedTokenExists = sinon.stub(mockDb.revokedToken, 'exists')
revokedTokenExists.returns(1)

let next = sinon.stub()

let token = jwt.sign({sub: 'test@test.com', name: 'John Test', lv: 1}, key)

export default async () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({
    headers: {authorization: 'jwt ' + token}
  })
  let res = new MockResponse({})

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next, 'route')

  assert.equal(401, res.statusCode)
  assert.notOk(req.user)

  assert.notCalled(userFind)

  assert.calledOnce(revokedTokenExists)
  assert.calledWith(revokedTokenExists, token)
}
