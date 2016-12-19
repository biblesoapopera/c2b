import assert from 'bso-tools/assert'
import RBAC from 'rbac'
import authorize from 'bso-server/authorize'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let rbac = new RBAC({
  roles: ['user'],
  permissions: {
    resource: ['read']
  },
  grants: {
    user: ['read_resource']
  }
})

let next = sinon.stub()

export default async () => {
  let fn = authorize(rbac, 'delete', 'resource')

  let req = new MockRequest({
    user: {roles: ['user']}
  })
  let res = new MockResponse({})

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next, 'route')
  assert.equal(res.statusCode, 403)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'not authorized'}, res._getJSON())
}


