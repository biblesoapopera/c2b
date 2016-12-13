import assert from 'bso-tools/assert'
import create from 'bso-server/api/episode/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'

let db = {episode: {create: () => {}}}
let stub = sinon.stub(db.episode, 'create')
stub.returns({_id: 'asdf', title: 'myepisode'})

export default async () => {
  let fn = create(db)

  let req = new MockRequest({
    method: 'put',
    body: {title: 'myepisode'}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.notEqual(arg, 'route')
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({_id: 'asdf', title: 'myepisode'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, {title: 'myepisode'})
}
