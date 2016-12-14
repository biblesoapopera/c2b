import episode from 'bso-server/db/episode'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Episode'), 'findByIdAndRemove')
stub.returns({exec: ()=>{}})

export default async () => {
  await episode.delete('asdf')

  assert.calledOnce(stub)
  assert.calledWith(stub, 'asdf')
}
