import assert from 'bso-tools/assert'
import jwtFn from 'bso-client/jwt'
import sinon from 'sinon'
import localStorage from 'bso-client/test/resource/localStorage'

let stubGetItem = sinon.stub(localStorage, 'getItem')
stubGetItem.returns('my token')
let jwt = jwtFn(localStorage)

export default async () => {
  // setup
  jwt.remove()

  let result = jwt.get()

  assert.calledOnce(stubGetItem)
  assert.calledWith(stubGetItem, 'jwt')

  assert.equal('my token', result)

  // cleanup
  delete global.localStorage
  stubGetItem.restore()
}
