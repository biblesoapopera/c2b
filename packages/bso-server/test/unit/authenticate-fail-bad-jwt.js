import chai from 'chai'
import authenticate from 'bso-server/authenticate'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import jwt from 'jsonwebtoken'

let assert = chai.assert
let key = 'testing testing'
let mockDb = {}

let token = jwt.sign({name: 'John Test'}, 'wrong key')

export default () => {
  let fn = authenticate(key, mockDb)

  let req = new MockRequest({
    headers: {authorization: 'jwt ' + token}
  })
  let res = new MockResponse({})

  fn(req, res, (arg) => {
    assert.equal(arg, 'route')
    assert.equal(res.statusCode, 401)
    assert.notOk(req.user)
  })
}
