import path from 'path'

export default audioDir => {
  return async (req, res, next) => {
    if (!req.files) {
      res.status(500)
      res.type('json')
      res.send({msg: 'no file uploaded'})
      next('route')
    }

    // save file
    let file = req.files.audio
    await new Promise((resolve, reject) => {
      file.mv(path.join(audioDir, req.params.file + '.mp3'), function(err) {
        if (err) {
          res.status(500)
          res.type('json')
          res.send({msg: 'error'})
          next('route')
          reject(err)
        } else {
          resolve()
        }
      })
    })

    res.type('json')
    res.status(200)
    res.send({msg: 'upload successful'})
    next()
  }
}

