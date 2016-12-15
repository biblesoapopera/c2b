import readLangPublished from 'bso-server/api/series/readLangPublished'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import assert from 'bso-tools/assert'
import sinon from 'sinon'

let db = {series: {find: () => {}}}
let stub = sinon.stub(db.series, 'find')
stub.returns([])

export default async () => {

  let fn = readLangPublished(db)

  let req = new MockRequest({
    params: {lang: 'en'}
  })
  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.calledOnce(stub)
  assert.calledWith(stub, {lang: 'en', published: true})

  assert.notEqual(arg, 'route')

  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual([], res._getJSON())
}