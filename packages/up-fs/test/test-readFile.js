import assert from 'up-assert'
import readFile from 'up-fs/readFile'

export default async () => {
  let file = System.resolve('up-fs/test/resource/hello.txt')
  let content = await readFile(file)

  assert.equal('hello world\r\n', content)
}
