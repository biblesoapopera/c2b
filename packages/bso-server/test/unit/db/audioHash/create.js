import audioHash from 'bso-server/db/audioHash'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('AudioHash').prototype, 'save', cb => cb())

export default async () => {
  let r = await audioHash.create('test.mp3', '1234567890')
  assert.calledOnce(stub)
}
