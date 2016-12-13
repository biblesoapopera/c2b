import assert from 'bso-tools/assert'
import create from 'bso-server/api/episode/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'

let db = {episode: {create: () => {}}}
let stub = sinon.stub(db.episode, 'create')
stub.returns(new Promise((resolve, reject)=>reject()))

export default async () => {
  let fn = create(db)

  let req = new MockRequest({
    method: 'put',
    body: {}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'database error'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, {})
}
