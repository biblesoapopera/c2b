import assert from 'bso-tools/assert'
import login from 'bso-server/login'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'
import hash from 'password-hash'

let key = 'testing testing'
let mockDb = {user: {find: () => false}}

export default async () => {
  let fn = login(key, mockDb)

  let req = new MockRequest({
    method: 'post',
    body: {
      username: 'test@test.com',
      password: 'password123'
    }
  })

  let res = new MockResponse()

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => resolve(arg))}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 401)
  assert.isNotOk(res.get('authorization'))
  assert.isNotOk(req.user)
}
