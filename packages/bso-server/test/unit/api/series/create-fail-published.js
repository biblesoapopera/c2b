import assert from 'bso-tools/assert'
import create from 'bso-server/api/series/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'

let db = {}

export default async () => {
  let fn = create(db)

  let req = new MockRequest({
    method: 'put',
    body: {published: true}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 401)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual(
    {errors: {published: {msg: 'When creating a series, published field must be false.'}}},
    res._getJSON()
  )
}
