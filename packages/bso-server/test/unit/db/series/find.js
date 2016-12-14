import series from 'bso-server/db/series'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Series'), 'find')
stub.returns({exec: ()=>'result'})

export default async () => {
  let result = series.find({published: true})

  assert.equal('result', result)
  assert.calledOnce(stub)
  assert.calledWith(stub, {published: true})
}
