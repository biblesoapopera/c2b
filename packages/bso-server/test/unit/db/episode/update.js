import episode from 'bso-server/db/episode'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Episode'), 'findByIdAndUpdate')
stub.returns({exec: ()=>'result'})

export default async () => {
  let result = await episode.update('asdf', {
    lang: 'en',
    title: 'my episode',
    slides: [],
    img: 'my/episode/img.jpg'
  })

  assert.equal('result', result)
  assert.calledOnce(stub)
  assert.calledWith(stub, 'asdf', {
    lang: 'en',
    title: 'my episode',
    slides: [],
    img: 'my/episode/img.jpg'
  })
}
