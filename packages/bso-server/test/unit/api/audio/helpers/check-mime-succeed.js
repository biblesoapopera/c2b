import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkMime'
import MockRequest from 'mock-express-request'
import MockResponse from 'mock-express-response'
import sinon from 'sinon'

let stub = sinon.stub()

export default async () => {
  let req = new MockRequest({
    files: {audio: {
      mimetype: 'audio/mpeg3',
    }}
  })
  let res = new MockResponse({})

  let result = fn(req, res, stub)

  assert.ok(result)
  assert.notCalled(stub)
}
