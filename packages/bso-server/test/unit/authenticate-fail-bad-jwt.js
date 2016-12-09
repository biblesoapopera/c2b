import chai from 'chai'
import authenticate from 'bso-server/authenticate'
import httpMocks from 'node-mocks-http'
import jwt from 'jsonwebtoken'

let assert = chai.assert
let key = 'testing testing'
let mockDb = {}

let token = jwt.sign({name: 'John Test'}, 'wrong key')

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
