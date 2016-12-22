import assert from 'bso-tools/assert'
import jwtFn from 'bso-client/jwt'
import sinon from 'sinon'
import localStorage from 'bso-client/test/resource/localStorage'

let stubGetItem = sinon.stub(localStorage, 'getItem')
let stubRemoveItem = sinon.stub(localStorage, 'removeItem')

let jwt = jwtFn(localStorage)

export default async () => {
  // setup
  jwt.remove()
  let result = jwt.get()

  assert.calledOnce(stubGetItem)
  assert.calledWith(stubGetItem, 'jwt')

  assert.calledOnce(stubRemoveItem)
  assert.calledWith(stubRemoveItem, 'jwt')

  assert.notOk(result)

  // cleanup
  delete global.localStorage
  stubGetItem.restore()
  stubRemoveItem.restore()
}
