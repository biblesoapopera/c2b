import assert from 'bso-tools/assert'
import errHandler from 'bso-server/errHandler'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'

export default async () => {
  let fn = errHandler()

  let errObj = {}
  let req = new MockRequest()
  let res = new MockResponse()

  let arg = await new Promise((resolve, reject) => {
    try {fn(errObj, req, res, arg => resolve(arg))}
    catch (err) {reject(err)}
  })

  assert.notEqual(arg, 'route')
  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'internal server error'}, res._getJSON())
}
