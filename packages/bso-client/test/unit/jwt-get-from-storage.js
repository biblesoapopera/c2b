import assert from 'bso-tools/assert'
import jwt from 'bso-client/jwt'
import sinon from 'sinon'

let mockLocalStorage = {
  getItem: ()=>{},
  removeItem: ()=>{}
}
global.localStorage = mockLocalStorage

let stubGetItem = sinon.stub(mockLocalStorage, 'getItem')
stubGetItem.returns('my token')
export default async () => {
  // setup
  jwt.remove()

  let result = jwt.get()

  assert.calledOnce(stubGetItem)
  assert.calledWith(stubGetItem, 'jwt')

  assert.equal('my token', result)

  // cleanup
  delete global.localStorage
}
