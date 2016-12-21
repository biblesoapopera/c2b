import assert from 'bso-tools/assert'
import userFn from 'bso-client/api/user'
import sinon from 'sinon'

let mockXhr = {post: ()=>{}}
let stubPost = sinon.stub(mockXhr, 'post')
stubPost.returns({status: 401, body: {msg: 'login failed'}})
let user = userFn(mockXhr)

export default async () => {
  let result = await user.login('test@test.com', 'test123')

  assert.notOk(result)
  assert.deepEqual({roles: ['guest']}, user.active())
}
