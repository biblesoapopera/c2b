import readOrphan from 'bso-server/api/episode/readOrphan'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import assert from 'bso-tools/assert'
import sinon from 'sinon'

let db = {episode: {find: () => {}}}
let stub = sinon.stub(db.episode, 'find')
stub.returns([])

export default async () => {

  let fn = readOrphan(db)

  let req = new MockRequest({
    params: {id: 1}
  })
  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.calledOnce(stub)
  assert.calledWith(stub, {series: null})

  assert.notEqual(arg, 'route')

  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual([], res._getJSON())
}
