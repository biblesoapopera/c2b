import audioHash from 'bso-server/db/audioHash'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('AudioHash'), 'findOne')
stub.returns({exec: ()=>{return {name: 'myfile.mp3'}}})

export default async () => {
  let result = await audioHash.find('myfile.mp3')

  assert.equal('myfile.mp3', result.name)
  assert.calledOnce(stub)
  assert.calledWith(stub, {name: 'myfile.mp3'})
}
