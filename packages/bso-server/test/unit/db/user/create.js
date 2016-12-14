import user from 'bso-server/db/user'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('User').prototype, 'save', cb => cb())

export default async () => {
  try {
    await user.create({
      username: 'test@test.com',
      password: 'test12345678'
    })
  } catch (err) {
    throw new Error('Validation errors: ' + JSON.stringify(err.errors, null, 2))
  }
  assert.calledOnce(stub)
}
