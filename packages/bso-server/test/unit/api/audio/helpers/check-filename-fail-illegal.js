import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkFilename'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({
    params: {file: 'my/!audio'}
  })

  let caughtErr
  try {
    fn(req)
  } catch (err) {
    caughtErr = err
  }

  assert.equal('invalid filename', caughtErr.message)
}
