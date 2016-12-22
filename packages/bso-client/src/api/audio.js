export default (xhr, SparkMD5, FileReader) => {
  return {
    readLocal: async (remoteFile, localFile) => {
      // Load remote hash
      const remoteHash = (await xhr.get('/audio/' + remoteFile + '/hash')).hash

      const spark = new SparkMD5.ArrayBuffer()
      const fileReader = new FileReader()

      let result
      let localHash
      [localHash, result] = await new Promise((resolve, reject) => {
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

      // return audio buffer ready to play
      return result
    },
    readRemote: async (remoteFile) => {

    }
  }
}
