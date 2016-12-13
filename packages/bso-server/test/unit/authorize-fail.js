import chai from 'chai'
import RBAC from 'rbac'
import authorize from 'bso-server/authorize'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'

let assert = chai.assert

let rbac = new RBAC({
  roles: ['user'],
  permissions: {
    resource: ['read']
  },
  grants: {
    user: ['read_resource']
  }
})

export default () => {
  let fn = authorize(rbac, 'delete', 'resource')

  let req = new MockRequest({
    user: {roles: 'user'}
  })
  let res = new MockResponse({})

  fn(req, res, (arg) => {
    assert.equal(arg, 'route')
    assert.equal(res.statusCode, 401)
  })
}
