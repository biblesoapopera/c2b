import assert from 'up-assert'

let mids = System.registeredMids()
assert.ok(mids.indexOf('up-system/test/test-registeredMids') !== -1)
