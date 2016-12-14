import series from 'bso-server/db/series'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Series'), 'findOneAndRemove')
stub.returns({exec: ()=>{}})

export default async () => {
  await series.delete({_id: 'asdf'})

  assert.calledOnce(stub)
  assert.calledWith(stub, {_id: 'asdf'})
}
