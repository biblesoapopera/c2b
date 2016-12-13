import chai from 'chai'
import login from 'bso-server/login'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
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

  let req = new MockRequest({
    method: 'post',
    body: {
      username: 'test@test.com',
      password: 'password123'
    }
  })

  let res = new MockResponse()

  fn(req, res, (arg) => {
    assert.notEqual(arg, 'route')
    assert.equal(res.statusCode, 200)
    assert.ok(/application\/json/.test(res.get('content-type')))

    let token = res.getHeader('authorization').slice(4)
    let payload = jwt.verify(token, key)

    assert.equal(payload.sub, 'test@test.com', 'login user.username not as expected')
    assert.equal(payload.name, 'John Test', 'login user.name not as expected')

    assert.isOk(req.user)
  })
}
