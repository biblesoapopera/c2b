let fs = require('fs')

export default path => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err && err.code !== 'EEXIST') {
        reject(err)
        return
      }
      resolve()
    })
  })
}
