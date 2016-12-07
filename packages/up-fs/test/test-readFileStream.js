import assert from 'up-assert'
import pipe from 'up-stream/pipe'
import readFileStream from 'up-fs/readFileStream'

export default async () => {
  let file = System.resolve('up-fs/test/resource/hello.txt')
  let content = []
  await pipe(readFileStream(file), content)
  assert.equal('hello world\r\n', content.join(''))
}
