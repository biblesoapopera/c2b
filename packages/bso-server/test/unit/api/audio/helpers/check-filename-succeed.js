import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkFilename'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({
    params: {file: 'myaudio'}
  })

  let result = fn(req)

  assert.ok(result)
}
