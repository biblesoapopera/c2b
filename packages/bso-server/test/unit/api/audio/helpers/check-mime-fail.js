import assert from 'bso-tools/assert'
import fn from 'bso-server/api/audio/helpers/checkMime'
import MockRequest from 'mock-express-request'

export default async () => {
  let req = new MockRequest({
    files: {audio: {
      mimetype: 'application/json',
    }}
  })

  let caughtErr
  try {
    fn(req)
  } catch (err) {
    caughtErr = err
  }

  assert.equal('uploaded file is not an mp3 audio file', caughtErr.message)
}
