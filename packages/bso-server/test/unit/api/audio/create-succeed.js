import assert from 'bso-tools/assert'
import create from 'bso-server/api/audio/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'

let audioDir = 'test/audioDir'
let db = {audioHash: {create: () => {}}}
let dbSpy = sinon.spy(db.audioHash, 'create')

let data = Buffer.from('this is a dummy audio file')
const hash = crypto.createHash('sha256')
let dataHash = hash.update(data).digest('base64')

export default async () => {
  let fn = create(audioDir, db)

  let req = new MockRequest({
    method: 'put',
    params: {file: 'myaudio'},
    files: {audio: {
      mimetype: 'audio/mpeg3',
      data: data,
      mv: (path, cb) => cb()
    }}
  })

  let mvSpy = sinon.spy(req.files.audio, 'mv')

  let res = new MockResponse({})

  let next = sinon.stub()

  await fn(req, res, next)

  assert.calledOnce(next)
  assert.calledWith(next)
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'upload successful'}, res._getJSON())

  assert.calledOnce(mvSpy)
  assert.equal(mvSpy.args[0][0], path.normalize('test/audioDir/myaudio.mp3'))
  assert.isFunction(mvSpy.args[0][1])

  assert.calledOnce(dbSpy)
  assert.calledWith(dbSpy, 'myaudio.mp3', dataHash)
}
