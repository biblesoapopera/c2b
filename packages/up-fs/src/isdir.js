let fs = require('fs')

export default path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {
        reject(err)
        return
      }
      if (stat.isDirectory()) resolve(true)
      else resolve()
    })
  })
}
