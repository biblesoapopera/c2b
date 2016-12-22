import assert from 'bso-tools/assert'
import active from 'bso-server/api/user/active'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let next = sinon.stub()

export default async () => {
  let fn = active()

  let req = new MockRequest({
    method: 'post',
    user: {
      username: 'test@test.com',
      password: 'password123',
      name: 'John Test',
      lang: 'en',
      roles: ['student']
    }
  })

  let res = new MockResponse()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({
    username: 'test@test.com',
    name: 'John Test',
    lang: 'en',
    roles: ['student']
  }, res._getJSON())
}
