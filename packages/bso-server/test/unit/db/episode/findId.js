import episode from 'bso-server/db/episode'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Episode'), 'findById')
stub.returns({exec: ()=>'result'})

export default async () => {
  let result = episode.findId(1)

  assert.equal('result', result)
  assert.calledOnce(stub)
  assert.calledWith(stub, 1)
}
