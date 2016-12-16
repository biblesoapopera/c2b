import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkFilename'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({})

  let result
  let caughtErr
  try {
    result = fn(req)
  } catch (err) {
    caughtErr = err
  }

  assert.equal('invalid filename', caughtErr.message)
}
