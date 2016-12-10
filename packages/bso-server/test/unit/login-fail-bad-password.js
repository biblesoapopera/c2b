import chai from 'chai'
import login from 'bso-server/login'
import httpMocks from 'node-mocks-http'
import jwt from 'jsonwebtoken'
import hash from 'password-hash'

let assert = chai.assert
let key = 'testing testing'
let mockDb = {user: {find: () => {return {
  username: 'test@test.com',
  password: hash.generate('password123'),
  name: 'John Test'
}}}}

export default () => {
  let fn = login(key, mockDb)

  let req = httpMocks.createRequest({
    method: 'post',
    body: {
      username: 'test@test.com',
      password: 'bad password'
    }
  })

  let res = httpMocks.createResponse()

  fn(req, res, (arg) => {
    assert.equal(arg, 'route')
    assert.equal(res.statusCode, 401)
    assert.isNotOk(res.getHeader('authorization'))
    assert.isNotOk(req.user)
  })
}