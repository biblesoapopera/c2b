import user from 'bso-server/db/user'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('User'), 'findOne')
stub.returns({exec: () => 'result'})

export default async () => {
  let result = user.find({username: 'test@test.com'})

  assert.equal('result', result)
  assert.calledOnce(stub)
  assert.calledWith(stub, {username: 'test@test.com'})
}
