import assert from 'bso-tools/assert'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'
import sinon from 'sinon'

let key = 'testing testing'
let mockDb = {}
let next = sinon.stub()
let token = jwt.sign({sub: 'test@test.com', name: 'John Test'}, key)

export default async () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({
    headers: {authorization: 'bad-bearer ' + token}
  })
  let res = new MockResponse({})

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next, 'route')
  assert.equal(res.statusCode, 401)
  assert.notOk(req.user)
}
