import db from 'bso-server/db'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Episode'), 'findOne')
stub.returns({exec: ()=>{return {id: 1}}})

export default async () => {
  let episode = await db('mongodb://localhost/test').episode.find(1)

  assert.equal(1, episode.id)
  assert.calledOnce(stub)
  assert.calledWith(stub, {id: 1})
}
