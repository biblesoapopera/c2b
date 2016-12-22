import assert from 'bso-tools/assert'
import jwtFn from 'bso-client/jwt'
import sinon from 'sinon'
import localStorage from 'bso-client/test/resource/localStorage'

let stubSetItem = sinon.stub(localStorage, 'setItem')
let jwt = jwtFn(localStorage)

export default async () => {
  // setup
  jwt.remove()
  jwt.set('mytoken')

  assert.calledOnce(stubSetItem)
  assert.calledWith(stubSetItem, 'jwt', 'mytoken')

  // cleanup
  delete global.localStorage
  stubSetItem.restore()
}
