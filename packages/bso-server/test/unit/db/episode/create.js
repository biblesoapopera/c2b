import episode from 'bso-server/db/episode'
import mongoose from 'mongoose'
import sinon from 'sinon'
import assert from 'bso-tools/assert'

let stub = sinon.stub(mongoose.model('Episode').prototype, 'save', cb => cb())

export default async () => {
  try {
    await episode.create({
      lang: 'en',
      title: 'my episode',
      slides: [],
      img: 'my/episode/img.jpg'
    })
  } catch (err) {
    throw new Error('Validation errors: ' + JSON.stringify(err.errors, null, 2))
  }

  assert.calledOnce(stub)
}
