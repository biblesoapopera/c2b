import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkFile'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({})

  let caughtErr
  try {
    fn(req)
  } catch (err) {
    caughtErr = err
  }

  assert.equal('no file uploaded', caughtErr.message)
}
