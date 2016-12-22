import assert from 'bso-tools/assert'
import langFn from 'bso-client/api/lang'
import sinon from 'sinon'

let mockXhr = {}

let lang = langFn(mockXhr)

export default () => {
  let result = lang.readSync('dne')

  assert.notOk(result)
}
