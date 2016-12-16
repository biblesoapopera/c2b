import assert from 'bso-tools/assert'
import deleteSeries from 'bso-server/api/series/delete'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {series: {delete: () => {}}}
let stub = sinon.stub(db.series, 'delete')
stub.returns({_id: 'asdf', title: 'myseries'})

export default async () => {
  let fn = deleteSeries(db)

  let req = new MockRequest({
    method: 'delete',
    params: {id: 'asdf'}
  })

  let res = new MockResponse({})

  let next = sinon.stub()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({_id: 'asdf', title: 'myseries'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, {_id: 'asdf', published: false})
}
