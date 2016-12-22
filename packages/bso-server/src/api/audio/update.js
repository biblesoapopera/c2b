import path from 'path'
import crypto from 'crypto'
import checkFile from './helpers/checkFile'
import checkFilename from '../helpers/checkFilename'
import checkMime from './helpers/checkMime'

export default (audioDir, db) => {
  return async (req, res, next) => {
    if (!checkFile(req)) return
    if (!checkFilename(req)) return
    if (!checkMime(req)) return

    let file = req.files.audio

    // update hash
    const hash = crypto.createHash('sha256')

    await db.audioHash.update(req.params.file + '.mp3', hash.update(file.data).digest('base64'))

    // save file
    await new Promise((resolve, reject) => {
      file.mv(path.join(audioDir, req.params.file + '.mp3'), function(err) {
        if (err) reject(err)
        else resolve()
      })
    })

    res.type('json')
    res.status(200)
    res.send({msg: 'update successful'})
    next()
  }
}

