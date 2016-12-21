import assert from 'bso-tools/assert'
import userFn from 'bso-client/api/user'
import sinon from 'sinon'

let mockXhr = {post: ()=>{}}
let stubPost = sinon.stub(mockXhr, 'post')
stubPost.returns({status: 500, body: {msg: 'internal server error'}})
let user = userFn(mockXhr)

export default async () => {
  let result
  let err
  try {
    result = await user.login('test@test.com', 'test123')
  } catch (caughtErr) {
    err = caughtErr
  }

  assert.ok(err)
  assert.notOk(result)
  assert.deepEqual({roles: ['guest']}, user.active())
}
