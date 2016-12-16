import readId from 'bso-server/api/episode/readId'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import assert from 'bso-tools/assert'
import sinon from 'sinon'

let db = {episode: {find: () => {}}}
let stub = sinon.stub(db.episode, 'find')
stub.returns(new Promise((resolve, reject) => reject(new Error('database error'))))

export default async () => {

  let fn = readId(db)

  let req = new MockRequest({
    params: {id: 1}
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
  assert.calledWith(stub, {_id: 1, series: {$exists: true}})
}
