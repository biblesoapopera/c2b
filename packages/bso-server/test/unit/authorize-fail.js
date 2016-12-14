import assert from 'bso-tools/assert'
import RBAC from 'rbac'
import authorize from 'bso-server/authorize'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'

let rbac = new RBAC({
  roles: ['user'],
  permissions: {
    resource: ['read']
  },
  grants: {
    user: ['read_resource']
  }
})

export default async () => {
  let fn = authorize(rbac, 'delete', 'resource')

  let req = new MockRequest({
    user: {roles: ['user']}
  })
  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => resolve(arg))}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 403)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'not authorized'}, res._getJSON())
}


