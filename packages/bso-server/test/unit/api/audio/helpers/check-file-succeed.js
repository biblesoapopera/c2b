import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkFile'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({
    files: {audio: {}}
  })

  let result = fn(req)

  assert.ok(result)
}
