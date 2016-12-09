import chai from 'chai'
import authenticate from 'bso-server/authenticate'
import httpMocks from 'node-mocks-http'
import jwt from 'jsonwebtoken'

let assert = chai.assert
let key = 'testing testing'
let mockDb = {user: {find: () => false}}

let token = jwt.sign({sub: 'test@test.com', name: 'John Test'}, key)

export default () => {
  let fn = authenticate(key, mockDb)

  let req = httpMocks.createRequest({
    headers: {authorization: 'jwt ' + token}
  })
  let res = httpMocks.createResponse()

  fn(req, res, (arg) => {
    assert.equal(arg, 'route')
    assert.equal(res.statusCode, 401)
    assert.notOk(req.user)
  })
}
