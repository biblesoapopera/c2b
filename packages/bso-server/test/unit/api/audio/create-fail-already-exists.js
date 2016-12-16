import assert from 'bso-tools/assert'
import create from 'bso-server/api/audio/create'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import crypto from 'crypto'

let audioDir = 'test/audioDir'
let db = {audioHash: {create: () => new Promise((resolve, reject)=>reject(new Error('database error')))}}
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

  let caughtErr
  try {
    await fn(req, res, next)
  } catch (err) {
    caughtErr = err
  }

  assert.equal('database error', caughtErr.message)
  assert.notCalled(next)

  assert.notCalled(mvSpy)

  assert.calledOnce(dbSpy)
  assert.calledWith(dbSpy, 'myaudio.mp3', dataHash)
}
