let fs = require('fs')

export default (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, {encoding: 'utf8'}, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
