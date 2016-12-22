import assert from 'bso-tools/assert'
import userFn from 'bso-client/api/user'
import sinon from 'sinon'

let mockXhr = {}
let mockJwt = {get: () => {}}

let user = userFn(mockXhr, mockJwt)

export default async () => {
  let result = await user.active()

  assert.deepEqual({roles: ['guest']}, result)
}
