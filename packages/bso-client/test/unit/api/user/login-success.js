import assert from 'bso-tools/assert'
import userFn from 'bso-client/api/user'
import sinon from 'sinon'

let mockXhr = {post: ()=>{}}
let stubPost = sinon.stub(mockXhr, 'post')
stubPost.returns({status: 200, body: {username: 'Fred'}})
let user = userFn(mockXhr)

export default async () => {
  let result = await user.login('test@test.com', 'test123')

  assert.ok(result)
  assert.deepEqual({username: 'Fred'}, user.active())
}
