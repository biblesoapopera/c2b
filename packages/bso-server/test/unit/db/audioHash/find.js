import audioHash from 'bso-server/db/audioHash'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('AudioHash'), 'findOne')
stub.returns({exec: ()=>{return {name: 'myfile'}}})

export default async () => {
  let result = await audioHash.find('myfile')

  assert.equal('myfile', result.name)
  assert.calledOnce(stub)
  assert.calledWith(stub, {name: 'myfile'})
}
