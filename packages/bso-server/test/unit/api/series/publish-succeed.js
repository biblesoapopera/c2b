import assert from 'bso-tools/assert'
import publish from 'bso-server/api/series/publish'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let db = {series: {update: () => {}}}
let stub = sinon.stub(db.series, 'update')
stub.returns({_id: 'asdf', title: 'myseries'})

export default async () => {
  let fn = publish(db)

  let req = new MockRequest({
    method: 'patch',
    params: {id: 'asdf'}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.notEqual(arg, 'route')
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({_id: 'asdf', title: 'myseries'}, res._getJSON())

  assert.calledOnce(stub)
  assert.calledWith(stub, {_id: 'asdf'}, {published: true})
}
