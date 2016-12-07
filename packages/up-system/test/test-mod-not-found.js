import assert from 'up-assert'

export default async () => {
  try {
    await System.import('up-system/up-does-not-exist')
  } catch (err) {
    assert('MODULE_NOT_FOUND', err.code)
    return
  }
  assert.ok(false)
}
