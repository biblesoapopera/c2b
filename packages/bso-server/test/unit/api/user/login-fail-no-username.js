import assert from 'bso-tools/assert'
import login from 'bso-server/api/user/login'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let key = 'testing testing'
let mockDb = {user: {find: () => {}}}

let userFind = sinon.stub(mockDb.user, 'find')

let next = sinon.stub()

export default async () => {
  let fn = login(key, mockDb)

  let req = new MockRequest({
    method: 'post',
    body: {
      password: 'password123'
    }
  })

  let res = new MockResponse()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next, 'route')

  assert.equal(res.statusCode, 401)
  assert.isNotOk(res.get('authorization'))
  assert.isNotOk(req.user)

  assert.notCalled(userFind)
}
