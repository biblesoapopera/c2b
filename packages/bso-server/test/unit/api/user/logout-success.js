import assert from 'bso-tools/assert'
import logout from 'bso-server/api/user/logout'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let mockDb = {revokedToken: {create: () => {}}}
let stub = sinon.stub(mockDb.revokedToken, 'create')
let next = sinon.stub()

export default async () => {
  let fn = logout(mockDb)

  let req = new MockRequest({
    method: 'get',
    token: {
      value: 'my token',
      payload: {
        exp: 123456789
      }
    }
  })

  let res = new MockResponse()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual(
    {msg: 'logged out'},
    res._getJSON()
  )

  assert.calledOnce(stub)
  assert.calledWith(stub, 'my token', 123456789)
}
