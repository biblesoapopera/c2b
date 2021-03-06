import assert from 'bso-tools/assert'
import deleteEpisode from 'bso-server/api/episode/delete'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {episode: {delete: () => {}}}
let stub = sinon.stub(db.episode, 'delete')
stub.returns({_id: 'asdf', title: 'myepisode'})

export default async () => {
  let fn = deleteEpisode(db)

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
  assert.deepEqual({_id: 'asdf', title: 'myepisode'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, 'asdf')
}
