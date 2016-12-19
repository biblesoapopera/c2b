import revokedToken from 'bso-server/db/revokedToken'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('RevokedToken').prototype, 'save', cb => cb())

export default async () => {
  try {
    await revokedToken.create('asdf', 12345)
  } catch (err) {
    throw new Error('Validation errors: ' + JSON.stringify(err.errors, null, 2))
  }
  assert.calledOnce(stub)

  mongoose.model('RevokedToken').prototype.save.restore()
}
