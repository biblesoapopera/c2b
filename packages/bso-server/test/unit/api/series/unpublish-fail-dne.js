import assert from 'bso-tools/assert'
import unpublish from 'bso-server/api/series/unpublish'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {series: {update: () => {}}}
let stub = sinon.stub(db.series, 'update')
stub.returns(new Promise((resolve, reject)=>reject(new Error('database error'))))

export default async () => {
  let fn = unpublish(db)

  let req = new MockRequest({
    method: 'patch',
    params: {id: 'dne'},
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
  assert.calledWith(stub, {_id: 'dne'}, {published: false})
}
