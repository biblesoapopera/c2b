import assert from 'bso-tools/assert'
import deleteAudio from 'bso-server/api/audio/delete'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'

let audioDir = 'test/audioDir'
let db = {audioHash: {delete: () => {}}}
let dbSpy = sinon.spy(db.audioHash, 'delete')


export default async () => {
  let fn = deleteAudio(audioDir, db)

  let req = new MockRequest({
    method: 'delete',
    params: {file: 'myaudio'}
  })

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.notEqual(arg, 'route')
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'delete successful'}, res._getJSON())

  assert.calledOnce(dbSpy)
  assert.calledWith(dbSpy, 'myaudio.mp3')
}
