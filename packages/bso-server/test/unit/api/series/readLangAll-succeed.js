import readLangAll from 'bso-server/api/series/readLangAll'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import assert from 'bso-tools/assert'
import sinon from 'sinon'

let db = {series: {find: () => {}}}
let stub = sinon.stub(db.series, 'find')
stub.returns([])

export default async () => {

  let fn = readLangAll(db)

  let req = new MockRequest({
    params: {lang: 'en'}
  })
  let res = new MockResponse({})

  let next = sinon.stub()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)

  assert.calledOnce(stub)
  assert.calledWith(stub, {lang: 'en'})

  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual([], res._getJSON())
}
