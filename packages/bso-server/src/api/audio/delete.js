import path from 'path'
import del from 'del'
import checkFilename from './helpers/checkFilename'

export default (audioDir, db) => {
  return async (req, res, next) => {
    if (!checkFilename(req)) return

    // delete hash
    await db.audioHash.delete(req.params.file + '.mp3')

    await del([path.join(audioDir, req.params.file + '.mp3')])

    res.type('json')
    res.status(200)
    res.send({msg: 'delete successful'})
    next()
  }
}
