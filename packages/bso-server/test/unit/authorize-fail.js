import chai from 'chai'
import RBAC from 'rbac'
import authorize from 'bso-server/authorize'
import httpMocks from 'node-mocks-http'

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

  let req = httpMocks.createRequest({
    user: {roles: 'user'}
  })
  let res = httpMocks.createResponse()

  fn(req, res, (arg) => {
    assert.equal(arg, 'route')
    assert.equal(res.statusCode, 401)
  })
}
