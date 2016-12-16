import assert from 'bso-tools/assert'
import create from 'bso-server/api/series/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {series: {create: () => {}}}
let stub = sinon.stub(db.series, 'create')
stub.returns(new Promise((resolve, reject)=>reject(new Error('database error'))))

export default async () => {
  let fn = create(db)

  let req = new MockRequest({
    method: 'put',
    body: {}
  })

  let res = new MockResponse({})

  let next = sinon.stub()

  let caughtErr
  try {
    await fn(req, res, next)
  } catch (err) {
    caughtErr = err
  }

  assert.equal('database error', caughtErr.message)
  assert.notCalled(next)

  assert.calledOnce(stub)
  assert.calledWith(stub, {})
}
