export default (xhr, SparkMD5, FileReader, cache) => {
  return {
    has: file => {
      return cache.has(file)
    },
    get: file => {
      return cache.get(file)
    },
    loadLocal: async (remoteFile, localFile) => {
      // Load remote hash
      const remoteHashResponse = await xhr.get('/audio/' + remoteFile + '/hash')

      if (remoteHashResponse.status !== 200) throw new Error('server error')
      let remoteHash = remoteHashResponse.body.hash

      let resultArrayBuffer
      let localHash
      [localHash, result] = await new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = evt => {
          spark.append(evt.target.result)

          resolve([spark.end(), evt.target.result])
        }

        fileReader.onerror = function (err) {
          reject(err)
        }

        fileReader.readAsArrayBuffer(localFile)
      })

      if (localHash !== remoteHash) {
        throw new Error('Bad local file')
      }
      cache.set(remoteFile, URL.createObjectURL(new Blob([resultArrayBuffer])))
    },
    loadRemote: async (remoteFile, progressCb) => {
      const remoteFileResponse = await xhr.get('/audio/' + remoteFile + '.mp3', 'blob', progressCb)

      if (remoteFileResponse.status !== 200) throw new Error('server error')

      cache.set(remoteFile, URL.createObjectURL(remoteFileResponse.body))
    }
  }
}
