import series from 'bso-server/db/series'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Series'), 'findOneAndUpdate')
stub.returns({exec: ()=>'result'})

export default async () => {
  let result = await series.update('asdf', {
    lang: 'en',
    number: 1,
    title: 'my series'
  })

  assert.equal('result', result)
  assert.calledOnce(stub)
  assert.calledWith(stub, 'asdf', {
    lang: 'en',
    number: 1,
    title: 'my series'
  })
}
