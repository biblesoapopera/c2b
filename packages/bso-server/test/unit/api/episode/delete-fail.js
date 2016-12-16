import assert from 'bso-tools/assert'
import deleteEpisode from 'bso-server/api/episode/delete'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {episode: {delete: () => {}}}
let stub = sinon.stub(db.episode, 'delete')
stub.returns(new Promise((resolve, reject)=>reject(new Error('database error'))))

export default async () => {
  let fn = deleteEpisode(db)

  let req = new MockRequest({
    method: 'delete',
    params: {id: 'asdf'}
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
  assert.calledWith(stub, 'asdf')
}
