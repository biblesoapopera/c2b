import audioHash from 'bso-server/db/audioHash'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('AudioHash'), 'findOneAndUpdate')
stub.returns({exec: ()=>{return {name: 'myfile.mp3', hash: '1234567890'}}})

export default async () => {
  let result = await audioHash.update('myfile.mp3', '1234567890')

  assert.deepEqual({name: 'myfile.mp3', hash: '1234567890'}, result)
  assert.calledOnce(stub)
  assert.calledWith(stub, {name: 'myfile.mp3'})
}
