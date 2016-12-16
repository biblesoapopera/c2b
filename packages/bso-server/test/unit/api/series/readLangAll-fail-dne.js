import assert from 'bso-tools/assert'
import readLangAll from 'bso-server/api/series/readLangAll'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {series: {find: () => {}}}
let stub = sinon.stub(db.series, 'find')
stub.returns(new Promise((resolve, reject)=>reject(new Error('database error'))))

export default async () => {
  let fn = readLangAll(db)

  let req = new MockRequest({
    method: 'patch',
    params: {lang: 'en'}
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
  assert.calledWith(stub, {lang: 'en'})
}
