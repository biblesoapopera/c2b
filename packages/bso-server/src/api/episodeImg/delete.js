import path from 'path'
import del from 'del'
import checkFilename from '../helpers/checkFilename'

export default (episodeImgDir) => {
  return async (req, res, next) => {
    if (!checkFilename(req)) return

    await del([path.join(episodeImgDir, req.params.file + '.jpeg')])

    res.type('json')
    res.status(200)
    res.send({msg: 'delete successful'})
    next()
  }
}
