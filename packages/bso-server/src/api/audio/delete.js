import path from 'path'
import del from 'del'
import fail from '../helpers/fail'
import checkFilename from './helpers/checkFilename'

export default (audioDir, db) => {
  return async (req, res, next) => {
    if (!checkFilename(req, res, next)) return

    // delete hash
    try {
      await db.audioHash.delete(req.params.file + '.mp3')
    } catch (err) {
      return fail(res, 'file delete error', next)
    }

    try {
      await del([path.join(audioDir, req.params.file + '.mp3')])
    } catch (err) {
      return fail(req, 'file delete error', next)
    }

    res.type('json')
    res.status(200)
    res.send({msg: 'delete successful'})
    next()
  }
}
