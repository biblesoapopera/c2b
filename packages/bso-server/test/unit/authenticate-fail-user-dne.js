import assert from 'bso-tools/assert'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'

let key = 'testing testing'
let mockDb = {user: {find: () => false}}

let token = jwt.sign({sub: 'test@test.com', name: 'John Test'}, key)

export default async () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({
    headers: {authorization: 'jwt ' + token}
  })
  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => resolve(arg))}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 401)
  assert.notOk(req.user)
}
