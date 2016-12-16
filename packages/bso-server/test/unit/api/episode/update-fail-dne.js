import assert from 'bso-tools/assert'
import update from 'bso-server/api/episode/update'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {episode: {update: () => {}}}
let stub = sinon.stub(db.episode, 'update')
stub.returns(new Promise((resolve, reject)=>reject(new Error('database error'))))

export default async () => {
  let fn = update(db)

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
  assert.calledWith(stub, 'dne', {})
}
