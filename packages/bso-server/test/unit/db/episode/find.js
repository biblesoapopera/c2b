import episode from 'bso-server/db/episode'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Episode'), 'findOne')
stub.returns({exec: ()=>{return {id: 1}}})

export default async () => {
  let result = episode.find(1)

  assert.equal(1, result.id)
  assert.calledOnce(stub)
  assert.calledWith(stub, {id: 1})
}
