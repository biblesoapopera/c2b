import assert from 'bso-tools/assert'
import userFn from 'bso-client/api/user'
import sinon from 'sinon'

let mockXhr = {get: () => {}}
let mockJwt = {get: () => {}}

let stubJwtGet = sinon.stub(mockJwt, 'get')
stubJwtGet.returns('mytoken')

let stubXhrGet = sinon.stub(mockXhr, 'get')
stubXhrGet.returns({status: 200, body: {name: 'Fred'}})

let user = userFn(mockXhr, mockJwt)

export default async () => {
  let result = await user.active()

  assert.deepEqual({name: 'Fred'}, result)
}
