import assert from 'up-assert'

export default async () => {
  await System.import('up-system/test/resource/import')
  let count = (await System.import('up-system/test/resource/import')).default

  assert.equal(1, count)
}
