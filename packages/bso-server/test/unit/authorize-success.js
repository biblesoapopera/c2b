import assert from 'bso-tools/assert'
import RBAC from 'rbac'
import authorize from 'bso-server/authorize'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import mongoose from 'mongoose'
import sinon from 'sinon'

mongoose.Promise = Promise

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
  let fn = authorize(rbac, 'read', 'resource')

  let req = new MockRequest({
    user: {roles: ['user']}
  })
  let res = new MockResponse({})

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
}
