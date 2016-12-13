import audioHash from 'bso-server/db/audioHash'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('AudioHash'), 'findOneAndRemove')
stub.returns({exec: ()=>{}})

export default async () => {
  await audioHash.delete('myfile.mp3')

  assert.calledOnce(stub)
  assert.calledWith(stub, {name: 'myfile.mp3'})
}
