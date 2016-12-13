import assert from 'bso-tools/assert'
import create from 'bso-server/api/audio/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'

let audioDir = 'test/audioDir'
let db = {audioHash: {create: () => {}}}
let dbSpy = sinon.spy(db.audioHash, 'create')

let data = Buffer.from('this is a dummy audio file')

export default async () => {
  let fn = create(audioDir, db)

  let req = new MockRequest({
    method: 'put',
    params: {file: 'myaudio'},
    files: {audio: {
      mimetype: 'audio/mpeg3',
      data: data,
      mv: (path, cb) => cb(new Error())
    }}
  })

  let mvSpy = sinon.spy(req.files.audio, 'mv')

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.equal(arg, 'route')
  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'error uploading file'}, res._getJSON())
}
