import assert from 'bso-tools/assert'
import update from 'bso-server/api/audio/update'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'
import path from 'path'
import crypto from 'crypto'

let audioDir = 'test/audioDir'
let db = {audioHash: {update: () => {}}}
let dbSpy = sinon.spy(db.audioHash, 'update')

let data = Buffer.from('this is a dummy audio file')
const hash = crypto.createHash('sha256')
let dataHash = hash.update(data).digest('base64')

export default async () => {
  let fn = update(audioDir, db)

  let req = new MockRequest({
    method: 'patch',
    params: {file: 'myaudio'},
    files: {audio: {
      mimetype: 'audio/mpeg3',
      data: data,
      mv: (path, cb) => cb()
    }}
  })

  let mvSpy = sinon.spy(req.files.audio, 'mv')

  let res = new MockResponse({})

  let arg = await new Promise((resolve, reject) => {
    try {fn(req, res, arg => {resolve(arg)})}
    catch (err) {reject(err)}
  })

  assert.notEqual(arg, 'route')
  assert.equal(res.statusCode, 200)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'update successful'}, res._getJSON())

  assert.calledOnce(mvSpy)
  assert.equal(mvSpy.args[0][0], path.normalize('test/audioDir/myaudio.mp3'))
  assert.isFunction(mvSpy.args[0][1])

  assert.calledOnce(dbSpy)
  assert.calledWith(dbSpy, 'myaudio.mp3', dataHash)
}
