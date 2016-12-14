import assert from 'bso-tools/assert'
import unpublish from 'bso-server/api/series/unpublish'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {series: {update: () => {}}}
let stub = sinon.stub(db.series, 'update')
stub.returns(new Promise((resolve, reject)=>reject(new Error())))

export default async () => {
  let fn = unpublish(db)

  let req = new MockRequest({
    method: 'patch',
    params: {id: 'dne'},
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
  assert.calledWith(stub, {_id: 'dne'}, {published: false})
}
