import series from 'bso-server/db/series'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Series').prototype, 'save', cb => cb())

export default async () => {
  try {
    await series.create({
      lang: 'en',
      number: 1,
      title: 'my series'
    })
  } catch (err) {
    throw new Error('Validation errors: ' + JSON.stringify(err.errors, null, 2))
  }
  assert.calledOnce(stub)
}
