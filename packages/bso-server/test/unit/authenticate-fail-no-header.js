import chai from 'chai'
import authenticate from 'bso-server/authenticate'
import httpMocks from 'node-mocks-http'

let assert = chai.assert
let key = 'testing testing'
let mockDb = {}

export default () => {
  let fn = authenticate(key, mockDb)

  let req = httpMocks.createRequest()
  let res = httpMocks.createResponse()

  fn(req, res, (arg) => {
    assert.equal(arg, 'route')
    assert.equal(res.statusCode, 401)
    assert.notOk(req.user)
  })
}
