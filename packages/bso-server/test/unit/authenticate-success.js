import chai from 'chai'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'

let assert = chai.assert
let key = 'testing testing'
let mockDb = {user: {find: () => {return {username: 'test@test.com'}}}}

let token = jwt.sign({sub: 'test@test.com', name: 'John Test'}, key)

export default () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({
    headers: {authorization: 'jwt ' + token}
  })
  let res = new MockResponse({})

  fn(req, res, (arg) => {
    assert.notEqual(arg, 'route')
    assert.notEqual(res.statusCode, 401)
    assert.deepEqual({username: 'test@test.com'}, req.user)
  })
}
