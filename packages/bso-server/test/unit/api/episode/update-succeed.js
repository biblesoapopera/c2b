import assert from 'bso-tools/assert'
import update from 'bso-server/api/episode/update'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'

let db = {episode: {update: () => {}}}
let stub = sinon.stub(db.episode, 'update')
stub.returns({_id: 'asdf', title: 'myepisode'})

export default async () => {
  let fn = update(db)

  let req = new MockRequest({
    method: 'patch',
    params: {id: 'asdf'},
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
  assert.calledWith(stub, 'asdf', {title: 'myepisode'})
}
