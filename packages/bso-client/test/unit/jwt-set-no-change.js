import assert from 'bso-tools/assert'
import jwt from 'bso-client/jwt'
import sinon from 'sinon'

let mockLocalStorage = {
  setItem: ()=>{},
  removeItem: ()=>{}
}
global.localStorage = mockLocalStorage

let stubSetItem = sinon.stub(mockLocalStorage, 'setItem')


export default async () => {
  // setup
  jwt.remove()
  jwt.set('mytoken')

  // now test no change - should not call setItem a second time
  jwt.set('mytoken')

  assert.calledOnce(stubSetItem)
  assert.calledWith(stubSetItem, 'jwt', 'mytoken')

  // cleanup
  delete global.localStorage
}
