import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkMime'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let stub = sinon.stub()

export default async () => {
  let req = new MockRequest({
    files: {audio: {
      mimetype: 'application/json',
    }}
  })
  let res = new MockResponse({})

  let result = fn(req, res, stub)

  assert.notOk(result)
  assert.calledOnce(stub)
  assert.calledWith(stub, 'route')
  assert.equal(res.statusCode, 500)
  assert.ok(/application\/json/.test(res.get('content-type')))
  assert.deepEqual({msg: 'uploaded file is not an mp3 audio file'}, res._getJSON())
}
