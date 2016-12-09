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
      password: 'password123'
    }
  })

  let res = httpMocks.createResponse()

  fn(req, res, (arg) => {
    assert.notEqual(arg, 'route')
    assert.equal(res.statusCode, 200)
    assert.equal(res.getHeader('Content-Type'), 'application/json')

    let token = res.getHeader('authorization').slice(4)
    let payload = jwt.verify(token, key)

    assert.equal(payload.sub, 'test@test.com', 'login user.username not as expected')
    assert.equal(payload.name, 'John Test', 'login user.name not as expected')

    assert.isOk(req.user)
  })
}
