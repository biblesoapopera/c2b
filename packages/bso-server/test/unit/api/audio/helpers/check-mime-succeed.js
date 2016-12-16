import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkMime'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({
    files: {audio: {
      mimetype: 'audio/mpeg3',
    }}
  })

  let result = fn(req)

  assert.ok(result)
}
