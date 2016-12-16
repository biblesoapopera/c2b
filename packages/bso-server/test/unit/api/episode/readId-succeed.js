import readId from 'bso-server/api/episode/readId'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import assert from 'bso-tools/assert'
import sinon from 'sinon'

let db = {episode: {find: () => {}}}
let stub = sinon.stub(db.episode, 'find')
stub.returns({id: 1})

export default async () => {

  let fn = readId(db)

  let req = new MockRequest({
    params: {id: 1}
  })
  let res = new MockResponse({})

  let next = sinon.stub()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)

  assert.calledOnce(stub)
  assert.calledWith(stub, {_id: 1, series: {$exists: true}})

  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({id: 1}, res._getJSON())
}
