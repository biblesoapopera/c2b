import readId from 'bso-server/api/episode/readId'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import assert from 'bso-tools/assert'
import sinon from 'sinon'

let db = {episode: {find: () => {}}}
let stub = sinon.stub(db.episode, 'find')
stub.returns(new Promise((resolve, reject) => reject()))

export default async () => {

  let fn = readId(db)

  let req = new MockRequest({
    params: {id: 1}
  })
  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.calledOnce(stub)
  assert.calledWith(stub, 1)

  assert.equal(arg, 'route')

  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'database error'}, res._getJSON())
}
