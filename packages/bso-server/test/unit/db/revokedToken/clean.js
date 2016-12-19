import revokedToken from 'bso-server/db/revokedToken'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

mongoose.Promise = Promise

let stub = sinon.stub(mongoose.model('RevokedToken'), 'remove')
stub.returns({exec: ()=>{}})

export default async () => {
  await revokedToken.clean()

  assert.calledOnce(stub)

  mongoose.model('RevokedToken').remove.restore()
}
