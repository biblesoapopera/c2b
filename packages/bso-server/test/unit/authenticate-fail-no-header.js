import assert from 'bso-tools/assert'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'

let key = 'testing testing'
let mockDb = {}

export default async () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({})
  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => resolve(arg))}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 401)
  assert.notOk(req.user)
}
