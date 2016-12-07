let fs = require('fs')

export default path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err)
        return
      }
      resolve(files)
    })
  })
}
