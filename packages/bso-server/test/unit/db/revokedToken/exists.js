import revokedToken from 'bso-server/db/revokedToken'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('RevokedToken'), 'count')
stub.returns({exec: ()=>1})

export default async () => {
  let result = await revokedToken.exists('asdf')

  assert.calledOnce(stub)
  assert.equal(1, result)

  mongoose.model('RevokedToken').count.restore()
}
