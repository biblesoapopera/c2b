import assert from 'bso-tools/assert'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let key = 'testing testing'
let mockDb = {}
let next = sinon.stub()

export default async () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({})
  let res = new MockResponse({})

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
  assert.deepEqual({roles: ['guest']}, req.user)
}
