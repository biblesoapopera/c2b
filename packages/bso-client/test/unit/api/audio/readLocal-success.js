import assert from 'bso-tools/assert'
import audioFn from 'bso-client/api/audio'
import SparkMD5 from 'spark-md5'
import FileAPI from 'file-api'
import sinon from 'sinon'
import crypto from 'crypto'
import path from 'path'

let mockXhr = {get: ()=>{}}
let stubGet = sinon.stub(mockXhr, 'get')
stubGet.returns({hash: '150699ced07ef65791d0f75e1d766f61'})

let audio = audioFn(mockXhr, SparkMD5, FileAPI.FileReader)

let localFile = new FileAPI.File(path.join(__dirname, '..', '..', '..', 'resource', 'audio.mp3'))

export default async () => {
  let result = await audio.readLocal('remoteFile', localFile)

  assert.ok(result)
}
