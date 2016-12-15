import path from 'path'
import crypto from 'crypto'
import fail from '../helpers/fail'
import checkFile from './helpers/checkFile'
import checkFilename from './helpers/checkFilename'
import checkMime from './helpers/checkMime'

export default (audioDir, db) => {
  return async (req, res, next) => {
    if (!checkFile(req, res, next)) return
    if (!checkFilename(req, res, next)) return
    if (!checkMime(req, res, next)) return

    let file = req.files.audio

    // update hash
    const hash = crypto.createHash('sha256')
    try {
      await db.audioHash.update(req.params.file + '.mp3', hash.update(file.data).digest('base64'))
    } catch (err) {
      return fail(res, 'file does not exist', next)
    }

    // save file
    try {
      await new Promise((resolve, reject) => {
        file.mv(path.join(audioDir, req.params.file + '.mp3'), function(err) {
          if (err) reject(err)
          else resolve()
        })
      })
    } catch (err) {
      return fail(res, 'error uploading file', next)
    }

    res.type('json')
    res.status(200)
    res.send({msg: 'update successful'})
    next()
  }
}

